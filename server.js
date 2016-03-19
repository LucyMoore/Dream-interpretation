var express = require('express')
var app = express();
var fs = require('fs')

// set the port to run on
app.set('port', 3000);

//static folder
app.use(express.static('client'))

//set up listeners
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('running on ' + port);
});

app.get('/api/v1/dreams', function(req,res){
  fs.readFile('DB.json','utf8', function(err, data){
    console.log(data)
    res.json(JSON.parse(data))
  })
})