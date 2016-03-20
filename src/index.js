var $ = require('jquery')
var request = require('superagent')

$(document).ready(function(){

  $('#elem1').blur(function(){
    var searchQuery = $('#elem1').val().toLowerCase();
    console.log(searchQuery)
    getAnalysis(searchQuery, '#text1')
  });

  function getAnalysis(search, returnTo){
    request
   .get('api/v1/dreams')
   .end(function(err, res){
    var value = JSON.parse(res.text)
    //check if you can use a variable to fetch an html element
    $(returnTo).html(value.dreams[search])
   });
  }


})