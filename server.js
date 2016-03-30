var express = require('express')
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser')
var request = require('superagent')
var dotenv = require('dotenv')
var sqlite = require('sqlite3');
var knexConfig = require('./DB/knexfile');
//one global variable
var fileObject

dotenv.load()

// set the port to run on
app.set('port', process.env.PORT || 3000);

//set body parser to json
app.use(bodyParser.json());

//set static folder
app.use(express.static('client'))

//set up listeners
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
});

// set up database
console.log(process.env.NODE_ENV);
var knex = require('knex') (knexConfig[process.env.NODE_ENV])

var db = require('./DB/DB.js')(knex)


//contact sqlite3 database read in requested item
app.get('/api/v1/dreams', function(req,res){
  db.getDbAnalysis('dreams', req.query, function(err, data){
    res.json(data)
  })
})

//search by alphabet instead = return whole database
app.get('/api/v1/dreams/all', function(req, res){
  db.getDbAll( function(err, data){
    res.json(data)
  })
})

//get image through flickr api
app.get('/api/v1/images',function(req, result){
  var query = req.query
  query['api_key'] = process.env.ACCESS_KEY
  request
    .get('https://api.flickr.com/services/rest/')
    .query(query)
    .end(function(err, res){
      result.send(res)
  })
})

//write user request to json file
app.post('/api/v1/dreams',function(req, res){
  var textToWrite = JSON.stringify(req.body)
  fs.readFile('requests.json', 'utf8', function(err, data){
    fileObject = data + " " + textToWrite
    fs.writeFile('requests.json', fileObject , function(err, data){
    })
  })
})

