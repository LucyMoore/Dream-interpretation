var express = require('express')
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser')
var request = require('superagent')
var dotenv = require('dotenv')
var sqlite = require('sqlite3');

var fileObject

dotenv.load()

// set the port to run on
app.set('port', 3000);

//set body parser to json
app.use(bodyParser.json());

//set static folder
app.use(express.static('client'))

//set up listeners
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('running on ' + port);
});

// set up database

var knex = require('knex') ({
  client: 'sqlite3',
  connection: {
    filename: './DB/dev.sqlite3'
  },
  useNullAsDefault: true
})

var db = require('./DB/DB.js')(knex)

//contact json 'database' read in object
app.get('/api/v1/dreams', function(req,res){
  // fs.readFile('DB.json','utf8', function(err, data){
  //   res.json(JSON.parse(data))
  // })
  console.log(req.query, 'res')
  db.getDbAnalysis('dreams', req.query, function(err, data){
    //console.log(data, 'data')
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
    console.log( fileObject)
  
    fs.writeFile('requests.json', fileObject , function(err, data){
    })
  })
})

