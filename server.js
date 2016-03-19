var express = require('express')
var app = express();

// set the port to run on
app.set('port', 3000);

//static folder
app.use(express.static('client'))

//set up listeners
var server = app.listen(app.get('port'), function() {
var port = server.address().port;
  console.log('running on ' + port);
});