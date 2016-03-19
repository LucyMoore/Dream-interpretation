var $ = require('jquery')
var request = require('superagent')

$(document).ready(function(){

  $('#elem1').blur(function(){
    var searchQuery = $('#elem1').val();
    console.log(searchQuery)
    getAnalysis(searchQuery, '#elem1')


    
  });

// $('#elem1').blur(function(){
//     var searchQuery = $('#elem1').val();
//     console.log(searchQuery)
//   });


// $('#elem1').blur(function(){
//     var searchQuery = $('#elem1').val();
//     console.log(searchQuery)
//   });
 
  function getAnalysis(search, returnTo){
    request
   .get('/api/v1/dreams')
   .end(function(err, res){
    var value = JSON.parse(res.text)
    console.log(returnTo)
    //return value.dreams.Guilt
  $(returnTo).append('meow')


   });
  }


})