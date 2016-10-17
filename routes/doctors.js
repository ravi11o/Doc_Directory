var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('doctors');
});

//Add Doctors
router.get('/add', function(req, res) {
  res.render('adddoctor');
});

//Details page
router.get('/details/:id', function(req, res) {
  res.render('details');
});
module.exports = router;
