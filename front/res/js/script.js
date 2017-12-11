//var apiURL = "https://labsdev.knolskape.com:8083";
var apiURL = "http://localhost:3000";

var startDate = new Date();
var cardTemplate = $('.categoryCard').detach();
var userId = 123;
var textId = "123";
var timeTaken = 123;
var originalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sagittis mi. Aliquam ultrices laoreet felis, ut venenatis dolor aliquet in. Aenean sollicitudin, mi vitae vulputate mollis, lorem lacus efficitur eros, sed congue est dui et elit. Donec dictum nibh vel faucibus lobortis. Quisque a malesuada metus. Duis eget sem ante."



function escape(s) {
        var n = s;
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
    
        return n;
    }
    
function diffString( o, n ) {
      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
      var str = "";
    
      var oSpace = o.match(/\s+/g);
      if (oSpace == null) {
        oSpace = ["\n"];
      } else {
        oSpace.push("\n");
      }
      var nSpace = n.match(/\s+/g);
      if (nSpace == null) {
        nSpace = ["\n"];
      } else {
        nSpace.push("\n");
      }
    
      if (out.n.length == 0) {
          for (var i = 0; i < out.o.length; i++) {
            str += '<del>' + escape(out.o[i]) + oSpace[i] + "</del>";
          }
      } else {
        if (out.n[0].text == null) {
          for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
            str += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
          }
        }
    
        for ( var i = 0; i < out.n.length; i++ ) {
          if (out.n[i].text == null) {
            str += '<ins>' + escape(out.n[i]) + nSpace[i] + "</ins>";
          } else {
            var pre = "";
    
            for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
              pre += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
            }
            str += " " + out.n[i].text + nSpace[i] + pre;
          }
        }
      }
      
      return str;
    }
    
function randomColor() {
        return "rgb(" + (Math.random() * 100) + "%, " + 
                        (Math.random() * 100) + "%, " + 
                        (Math.random() * 100) + "%)";
    }
function diffString2( o, n ) {
      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
    
      var oSpace = o.match(/\s+/g);
      if (oSpace == null) {
        oSpace = ["\n"];
      } else {
        oSpace.push("\n");
      }
      var nSpace = n.match(/\s+/g);
      if (nSpace == null) {
        nSpace = ["\n"];
      } else {
        nSpace.push("\n");
      }
    
      var os = "";
      var colors = new Array();
      for (var i = 0; i < out.o.length; i++) {
          colors[i] = randomColor();
    
          if (out.o[i].text != null) {
              os += '<span style="background-color: ' +colors[i]+ '">' + 
                    escape(out.o[i].text) + oSpace[i] + "</span>";
          } else {
              os += "<del>" + escape(out.o[i]) + oSpace[i] + "</del>";
          }
      }
    
      var ns = "";
      for (var i = 0; i < out.n.length; i++) {
          if (out.n[i].text != null) {
              ns += '<span style="background-color: ' +colors[out.n[i].row]+ '">' + 
                    escape(out.n[i].text) + nSpace[i] + "</span>";
          } else {
              ns += "<ins>" + escape(out.n[i]) + nSpace[i] + "</ins>";
          }
      }
    
      return { o : os , n : ns };
    }
    
function diff( o, n ) {
      var ns = new Object();
      var os = new Object();
      
      for ( var i = 0; i < n.length; i++ ) {
        if ( ns[ n[i] ] == null )
          ns[ n[i] ] = { rows: new Array(), o: null };
        ns[ n[i] ].rows.push( i );
      }
      
      for ( var i = 0; i < o.length; i++ ) {
        if ( os[ o[i] ] == null )
          os[ o[i] ] = { rows: new Array(), n: null };
        os[ o[i] ].rows.push( i );
      }
      
      for ( var i in ns ) {
        if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
          n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
          o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
        }
      }
      
      for ( var i = 0; i < n.length - 1; i++ ) {
        if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
             n[i+1] == o[ n[i].row + 1 ] ) {
          n[i+1] = { text: n[i+1], row: n[i].row + 1 };
          o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
        }
      }
      
      for ( var i = n.length - 1; i > 0; i-- ) {
        if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
             n[i-1] == o[ n[i].row - 1 ] ) {
          n[i-1] = { text: n[i-1], row: n[i].row - 1 };
          o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
        }
      }
      
      return { o: o, n: n };
    }
    $.fn.diffString = function(txt){
        return this.each(function(){
            $(this).html(diffString($(this).text(),txt));
        });
    };

function signOut() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
        var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
        sessionStorage.clear();
        //window.location.href = "/phrasecorrector";
        window.location.href = "/";
    });
      });
    
    //window.location.href = "/";
  }

function onLoad() {
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
    }

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    
    var myUserEntity = {};
    myUserEntity.Id = profile.getId();
    myUserEntity.Name = profile.getName();
    myUserEntity.ImageURL = profile.getImageUrl();
    myUserEntity.email = profile.getEmail();
  
    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));  
    var userObj = {
        "userId":profile.getId(),
        "email":profile.getEmail(),
        "name":profile.getName(),
        "imageurl":profile.getImageUrl()
    };
    var settings = {
          "async": true,
          "crossDomain": true,
          "url": apiURL+ "/user",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded",
          },
          "data": {
            "body": userObj
          }
        }

        $.ajax(settings).done(function (response) {
          //window.location.href = "/phrasecorrector/firstPage.html";
            window.location.href = "/firstPage.html";
        }); 
}

function checkIfLoggedIn()
{
  if(sessionStorage.getItem('myUserEntity') == null){
    window.location.href="/phrasecorrector/";
      window.location.href="/";
  } else {
    var userEntity = {};
    userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
  }
}

$('.logout').click(signOut)
$('.profile').click(getUserData)

function getUserData(){
    
    userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/userdata?userid="+userEntity.Id,
    "method": "GET"
}

    $.ajax(settings).done(function (response) {
      $(".paragraphsCorrected").html(response.numSubmissions);
        $(".wordsCorrected").html(response.totalWords);
        $(".minutesSpent").html(Math.round(response.totalTime/60000));
    });
}
  
$('#showChangeCkBx').change(function() {
    if($(this).is(":checked")) {
        var diffResult = diffString(originalText,$('#editableText').val());
        
        diffResult = diffResult.replace(new RegExp('<ins>','g'),"<span style=\"background-color:#abffa2\">");
        diffResult = diffResult.replace(new RegExp('</ins>','g'),"</span>");
        diffResult = diffResult.replace(new RegExp('<del>','g'),"<span style=\"background-color:#ffa2ad\">");
        diffResult = diffResult.replace(new RegExp('</del>','g'),"</span>");
        
       
        $('#textDiff').html(diffResult);
    }
    else{
        $('#textDiff').html(originalText);
    }
});

$('#resetChanges').click(function(){
    $('#editableText').val(originalText);
});

function fetchText(){
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": apiURL+ "/text?userid="+userId,
      "method": "GET",
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    }

    $.ajax(settings).done(function (response) {
        var text = response.text;
        $('#editableText').val(text);
        $('#textDiff').html(text);
        textId = response._id;
        originalText = text;
    });
    
}

$(document).ready(function(){
    
    
    checkIfLoggedIn();
    
    var userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
    userId = userEntity.Id;
    
    $('#username').html(userEntity.Name);
    $('#modalUsername').html(userEntity.Name);
    $('.userImage').attr("src",userEntity.ImageURL);
    gapi.load('auth2', function() {
        gapi.auth2.init();});
    
    fetchText();
    
    setInterval(clock, 1000);
    $('#gotoTwo').on("click",function(){
    $('.scrollable').html("");
    var diffResult = diffString(originalText,$('#editableText').val());
    var text, parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(diffResult,"text/html");
    $("#numPending").html(xmlDoc.getElementsByTagName("del").length);
        
    for(var i=0; i<xmlDoc.getElementsByTagName("del").length; i++){
        var wrong = xmlDoc.getElementsByTagName("del")[i].innerHTML;
        var correct = xmlDoc.getElementsByTagName("ins")[i].innerHTML;
        
        var card = cardTemplate.clone();
        
        card.find('.wrongWord').html(wrong);
        card.find('.correctWord').html(correct);
        
        card.find('.CategoryButton').on("click", function(){
            $(this).parent().siblings().find('.CategoryButton').removeClass('clickedButton');
            $(this).toggleClass('clickedButton');
            $("#numPending").html($("#numPending").html()-1);
        })
        
        $('.scrollable').append(card);
    }
});
    
    $('.confirmSubmit').on("click",function(){
        var diffResult = diffString(originalText,$('#editableText').val());
        var mistakeArray = []
        for(var i=0;i<$('.categoryCard').length;i++){
            var mistakeObj = {};
            var mistakeType = $('.categoryCard').eq(i).find('.clickedButton').text();
            var correction = $('.categoryCard').eq(i).find('.correctWord').text();
            var wrongWord = $('.categoryCard').eq(i).find('.wrongWord').text();
            var startIndex = diffResult.indexOf("<del>");
            diffResult = diffResult.replace("<del>","");
            var endIndex = diffResult.indexOf("</del>");
            diffResult = diffResult.replace("<ins>","");
            diffResult = diffResult.replace("</ins>","");
            
            mistakeObj = {
                "type":mistakeType,
                "startIndex": startIndex,
                "endIndex": endIndex,
                "wrongWord": wrongWord,
                "correction": correction
            }
            
            mistakeArray.push(mistakeObj);
        }

        var submissionObj = {
            "userId":userId,
            "time":timeTaken,
            "corrections":mistakeArray,
            "timeStamp":new Date(),
            "textId": textId
        }
        
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": apiURL+ "/submission",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded"
          },
          "data": {
            "body": JSON.stringify(submissionObj)
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
            
            
            var textObj = {
                "textId":textId,
                "text":originalText,
                "correctionCount":1,
                "correctionId":response._id,
                "activeCorrections":null
            }
            var settings2 = {
              "async": true,
              "crossDomain": true,
              "url": apiURL+ "/text",
              "method": "POST",
              "headers": {
                "content-type": "application/x-www-form-urlencoded"
              },
              "data": {
                "body": JSON.stringify(textObj)
              }
            }

            $.ajax(settings2).done(function (response) {
              startDate = new Date();
              fetchText();
              $('.scrollable').html("");
              $('#showChangeCkBx').prop('checked', false);
              $('#textDiff').html(originalText);
            });
        });
        
        
    });
});


function clock() {
    var time = new Date() - startDate - 19800000,
    
    hours = new Date(time).getHours(),
    minutes = new Date(time).getMinutes(),
    
    
    seconds = new Date(time).getSeconds();
    
    timeTaken = time + 19800000;
    
    $('#time').html(harold(hours) + ":" + harold(minutes) + ":" + harold(seconds));
  
      function harold(standIn) {
        if (standIn < 10) {
          standIn = '0' + standIn
        }
        return standIn;
      }
}

//setInterval(clock, 1000);

