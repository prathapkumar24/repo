const express = require('express');
const router = express.Router();
const indexController =  require('express');
/* GET home page. */
router.get('/', function(req, res, next) {

  return res.json({ title: 'Welcome to Express Dashboard' });
});

module.exports = router;
