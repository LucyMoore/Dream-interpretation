var express = require('express')
var app = express();
var fs = require('fs')
var request = require('superagent')

var dotenv = require('dotenv')

dotenv.load()

// set the port to run on
app.set('port', 3000);

//static folder
app.use(express.static('client'))

//set up listeners
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('running on ' + port);
});

//contact json 'database' read in object
app.get('/api/v1/dreams', function(req,res){
  fs.readFile('DB.json','utf8', function(err, data){
    res.json(JSON.parse(data))
  })
})


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


app.post('/api/v1/dreams',function(req, res){
    console.log(res, '%%%')
    fs.writeFile('requests.json','utf8', function(err, data){
    //res.json(JSON.parse(data))
    })
  })




