const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, match: /[A-Za-z]/ },
  password: { type: String, required: true, minlength: 6 },
  country: { type: String, required: true, match: /[A-Za-z]/},
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  mobile_no: { type: String, required: true, minlength: 9, unique: true },

}, { collection: 'user' });

//userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
