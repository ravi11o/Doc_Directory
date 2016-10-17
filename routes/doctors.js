var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints:['127.0.0.1']});
client.connect(function(err, result) {
    console.log('cassandra Connected');
});

/* GET Doctors listing. */
router.get('/', function(req, res) {
    if(req.query.state) {
        var query = "SELECT * FROM findadoc.doctors WHERE state = ?";
        client.execute(query, [req.query.state], function(err, results) {
            if(err) {
                res.status(404).send({msg: err});
            } else {
                res.render('doctors', {
                  doctors: results.rows
                });
            }
        });
    } else {
        var query = "SELECT * FROM findadoc.doctors";
        client.execute(query, [], function(err, results) {
             if(err) {
                res.status(404).send({msg: err});
            } else {
                res.render('doctors', {
                doctors: results.rows
                   });
            }
        });
    }
  
});

//Add Doctors
router.get('/add', function(req, res) {
  res.render('adddoctor');
});

//Details page
router.get('/details/:id', function(req, res) {
  var query = "SELECT * FROM findadoc.doctors WHERE doc_id = ?";
  client.execute(query, [req.params.id], function(err, result) {
    if(err) {
      res.status(404).send({msg: err});
    } else {
      res.render('details', {
        doctor: result.rows['0']
      });
    }
  });
});

//Select Category Wise Doctor
router.get('/category/:name', function(req, res) {
  var query = "SELECT * FROM findadoc.doctors WHERE category = ?";
  client.execute(query, [req.params.name], function(err, results) {
    if(err) {
      res.status(404).send({msg: err});
    } else {
      res.render('doctors', {
        doctors: results.rows
      });
    }
  });
});
module.exports = router;
