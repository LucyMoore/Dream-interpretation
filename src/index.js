var $ = require('jquery')
var request = require('superagent')

$(document).ready(function(){
  var alphabetPage = false
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

   //search by aphabet
$( "a" ).click(function( event ) {
  event.preventDefault()
  $('#display').children().remove()
  $('#display').append($("<div id='alphabetContent'/>" ))
    getAlphabet()
})

function getAlphabet(){
  $('h3').html('search for elements alphabeticaly')
  $('a').html('go back')
  alphabetPage = true
  request
  .get('api/v1/dreams/all')
  .end(function(err, res){
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    var response = res
    var elementsArr =[]
    for(var i=0; i<res.body.length; i++){
      elementsArr.push([res.body[i].element,res.body[i].analysis])
    }
    for(var i=0; i<alphabet.length; i++){
       $('#display').append('<div id='+alphabet[i]+'></div>')
    }
    for(var i=0; i<alphabet.length; i++){
      $('#' + alphabet[i]).html('<h2>'+alphabet[i].toUpperCase()+'<h2>')
    }
    for (var j = 0; j < alphabet.length; j++) {
      for (var i = 0; i <elementsArr.length; i++) {
        var mesure = elementsArr[i][0].charAt(0)
        if(mesure === alphabet[j]){
          $('#'+alphabet[j]).append('<p><strong>'+elementsArr[i][0]+ '</strong></p>'+'<p>'+elementsArr[i][1]+'</p>')
        }
      }
    }

      // for(var i=0; i<elementsArr.length; i++){
      //   // var arr = elementsArr.filter(function(e){
      //   //   $('#' + alphabet[i]).append(e)
      //   // })

      // }
    
    

  })

}

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