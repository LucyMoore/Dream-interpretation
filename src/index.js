var $ = require('jquery')
var request = require('superagent')

$(document).ready(function(){
//user interaction:

  //when focus moves from textfield 
  $('.elem').blur(function() {
      var num = (this.id).replace('elem', '')
      var searchQuery = $('#elem'+num).val().toLowerCase();
      if(searchQuery.length !== 0){
      getAnalysis(searchQuery, num)
      getImage(searchQuery, '#img'+num)
    }
    else{
      $('#text'+num).html("")
      $('#' + num+ ' button').css('visibility', 'hidden')
    }
  })
 
  //not working
  // $(document).keypress(function(e){
  //   if(e.keycode == 13){
  //     var num = (this.id).replace('elem', '')
  //     var searchQuery = $('#elem'+num).val().toLowerCase();
  //     getAnalysis(searchQuery, num)
  //     getImage(searchQuery, '#img'+num)
  //   }
  // })
  
  //request an analysis 
  $('button').click(function() {
    var num = $(this).parent().parent('div').attr('id');
    var textToSend = $('#elem' + num).val()
    $('#text'+num).html('Thanks')

    request
     .post('api/v1/dreams')
     .send({request: textToSend})
     .end(function(err,res){
    })
  })

//send request to server endpoint to return item from database
function getAnalysis(search, num){
  var returnTo = '#text' + num
  request
    .get('api/v1/dreams')
    .query({search})
    .end(function(err, res){
      var dreamData = res.body[0]
      console.log(dreamData,'res client')
      //var value = res.body
      if(dreamData === undefined){
        $(returnTo).html("Sorry we dont have an analysis for that.<br> Click the request button and we will add this element to our database.")
        $(' #' + num+ ' button').css('visibility', 'visible')
      }
      else{
        $(returnTo).html(dreamData.analysis)
        $('#' + num+ ' button').css('visibility', 'hidden')
      }
  })
}

//send request to server endpoint to return related image from flickr
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