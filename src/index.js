var $ = require('jquery')
var request = require('superagent')


$(document).ready(function(){


  $('#elem1').blur(function(){
    var searchQuery = $('#elem1').val().toLowerCase();
    //console.log(searchQuery, 'searchQuery 9')
    getAnalysis(searchQuery, '#text1')
    getImage(searchQuery, '#img1')
  });

  $('#elem2').blur(function(){
    var searchQuery = $('#elem2').val().toLowerCase();
    getAnalysis(searchQuery, '#text2')
    getImage(searchQuery, '#img2')
  });

  $('#elem3').blur(function(){
    var searchQuery = $('#elem3').val().toLowerCase();
    getAnalysis(searchQuery, '#text3')
    getImage(searchQuery, '#img3')
  });


  function getAnalysis(search, returnTo){
    request
     .get('api/v1/dreams')
     .end(function(err, res){
      var value = JSON.parse(res.text)
      if(value.dreams[search] === undefined){
        $(returnTo).html("Sorry we dont have an anaylisis for that. <button id='requestBtn'> request? </button>")
        // $('#requestBtn').click(function(){
        //   makeRequest(search)
        //   $('#requestBtn').attr('color', 'blue')
        // })
      }
      $(returnTo).html(value.dreams[search])
    });
  }

  function getImage(tag, returnTo){
    request
    .get('api/v1/images')
    .query({method: "flickr.photos.search", tags: tag, format: "json", nojsoncallback: 1})
    .end(function(err, res){
      var response = JSON.parse(res.body.text)
      var urlData= {
        farm: response.photos.photo[0].farm,
        server: response.photos.photo[0].server,
        id: response.photos.photo[0].id,
        secret: response.photos.photo[0].secret
      }
      var url = "//c"+urlData.farm+".staticflickr.com/"+urlData.server+"/"+urlData.id+"_"+urlData.secret+".jpg"
      $(returnTo).attr('src', url)
    })
  }
})

