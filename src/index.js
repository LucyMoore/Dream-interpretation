var $ = require('jquery')
var request = require('superagent')


$(document).ready(function(){

  // $('#elem1').blur(function(){
  //   var searchQuery = $('#elem1').val().toLowerCase();
  //   console.log(searchQuery, 'searchQuery 9')
  //   getAnalysis(searchQuery, '#text1')
  //   getImage(searchQuery)
  // });

  $('#elem2').blur(function(){
    var searchQuery = $('#elem2').val().toLowerCase();
    getAnalysis(searchQuery, '#text2')
  //  getImage(searchQuery)
  });

  $('#elem3').blur(function(){
    var searchQuery = $('#elem3').val().toLowerCase();
    getAnalysis(searchQuery, '#text3')
   // getImage(searchQuery)
  });


  function getAnalysis(search, returnTo){
    request
     .get('api/v1/dreams')
     .end(function(err, res){
      var value = JSON.parse(res.text)
      $(returnTo).html(value.dreams[search])
    });
  }

  function getImage(tag){
    request
    .get('api/v1/images')
    .query({method: "flickr.photos.search", tags: tag, format: "json", nojsoncallback: 1})
    .end(function(err, res){
      //var value = JSON.parse(res.text)
      console.log(Object.keys(res), "val")
      //why is the res.body empty?
      console.log("next", res.badRequest)
    })
  }
})

