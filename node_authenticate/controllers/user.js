const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const User = require("../models/user");


//API to signup an user.
function signup(req, res, next) {
  User.find({$or: [ { email: req.body.email}, { mobile_no: req.body.mobile_no}]})

  //User.find({ email: req.body.email ||email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        if(user[0].email === req.body.email){
          return res.status(409).json({
            message: "User email id exists already."
          });
        }
        if(user[0].mobile_no === req.body.mobile_no){
          return res.status(409).json({
            message: "User Mobile number exists already."
          });
        }
      } else {
        var password_score = passwordScore(req.body.password);
        if(password_score <= 50){
          return res.status(409).json({
            message: "Please enter strong password"
          });
        }
        
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: "Please enter a strong password"
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              password: hash,
              email: req.body.email,
              country: req.body.country,
              mobile_no: req.body.mobile_no,
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created successfully"
                });
              })
              .catch(err => {
                //console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
}

//API to login.
const login = async (req, res, next) => {
    await User.find({ email: req.body.email })
      .exec()
      .then(async user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Incorrect Email Id, Please try again"
          });
        }
         let isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
         if(!isValidPassword){
          return res.status(401).json({
            message: "Incorrect password, Please try again"
          });
         }
         const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
              expiresIn:  60 * process.env.TOKEN_EXPIRY_TIME
          }
        );
        return res.status(200).json({
          message: "Login successful",
          token: token
        });
          
       
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });

      
};

//authenticate user
const authenticate = async (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN' Header 
    
    if (!token) {
      return res.status(403).json({
        message: "Authentication failed",
      }); 
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_KEY);
    return res.status(401).json({
      message: "Authenticated successfully",
      userId: decodedToken.userId
    });
  } catch (err) {
    res.status(403).json({
      error: "Authentication failed",
    });
    return;
  }
}

const passwordScore = (pass) =>{
  var score = 0;
  if (!pass)
      return score;

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i=0; i<pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  var variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
  }

  var variationCount = 0;
  for (var check in variations) {
      variationCount += (variations[check] == true) ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}

exports.signup = signup;
exports.login = login;
exports.authenticate = authenticate;
