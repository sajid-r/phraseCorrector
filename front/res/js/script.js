//var apiURL = "https://labsdev.knolskape.com:8083";
var apiURL = "http://localhost:3000";

var startDate = new Date();
var cardTemplate = $('.categoryCard').detach();
var userId = 123;
var textId = "123";
var timeTaken = 123;
var $spinner = $("#spinner-row");
var originalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec sagittis mi. Aliquam ultrices laoreet felis, ut venenatis dolor aliquet in. Aenean sollicitudin, mi vitae vulputate mollis, lorem lacus efficitur eros, sed congue est dui et elit. Donec dictum nibh vel faucibus lobortis. Quisque a malesuada metus. Duis eget sem ante."
var correctionsArray = [];
var sentenceNumber = 0;



var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
var $input = $('#editableText');

//on keyup, start the countdown
$input.on('keyup', function () {
    $spinner.show();
    $('#textDiff').html("");
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
    $spinner.show();
    $('#textDiff').html("");
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  $spinner.hide();
  //loadCards();
    getDiff();
}

function escape(s) {
        var n = s;
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
    
        return n;
    }
    
//function diffString( o, n ) {
//      o = o.replace(/\s+$/, '');
//      n = n.replace(/\s+$/, '');
//    
//      var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
//      var str = "";
//    
//      var oSpace = o.match(/\s+/g);
//      if (oSpace == null) {
//        oSpace = ["\n"];
//      } else {
//        oSpace.push(" ");
//      }
//      var nSpace = n.match(/\s+/g);
//      if (nSpace == null) {
//        nSpace = ["\n"];
//      } else {
//        nSpace.push(" ");
//      }
//    
//      if (out.n.length == 0) {
//          for (var i = 0; i < out.o.length; i++) {
//            str += '<del>' + escape(out.o[i]) + oSpace[i] + "</del>";
//          }
//      } else {
//        if (out.n[0].text == null) {
//          for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
//            str += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
//          }
//        }
//    
//        for ( var i = 0; i < out.n.length; i++ ) {
//          if (out.n[i].text == null) {
//            str += '<ins>' + escape(out.n[i]) + nSpace[i] + "</ins>";
//          } else {
//            var pre = "";
//    
//            for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
//              pre += '<del>' + escape(out.o[n]) + oSpace[n] + "</del>";
//            }
//            str += "" + out.n[i].text + nSpace[i] + pre;
//          }
//        }
//      }
//      
//      return str;
//    }
    
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
    
function diffStringModified( o, n ) {
      o = o.replace(/\s+$/, '');
      n = n.replace(/\s+$/, '');
    
      var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
      var str = "";

		console.log(out);
    
      var oSpace = o.match(/\s+/g);
      if (oSpace == null) {
        oSpace = ["\n"];
      } else {
        oSpace.push(" ");
      }
      var nSpace = n.match(/\s+/g);
      if (nSpace == null) {
        nSpace = ["\n"];
      } else {
        nSpace.push(" ");
      }
    var flag=0;
    
      if (out.n.length == 0) {
          for (var i = 0; i < out.o.length; i++) {
            str += '<span type="del" style=\"background-color:#ffa2ad\" groupid=\"' + flag + '\" correctionid="-1">' + escape(out.o[i]) + oSpace[i] + "</span>";
			flag+=1;
			
          }
      } else {
        if (out.n[0].text == null) {
          for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
            str += '<span type="del" style=\"background-color:#ffa2ad\" groupid=\"' + flag + '\" correctionid=\"-1\">' + escape(out.o[n]) + oSpace[n] + "</span>";
          }
        }
    
        for ( var i = 0; i < out.n.length; i++ ) {
          if (out.n[i].text == null) {
            str += '<span type="ins" style=\"background-color:#abffa2\" groupid=\"' + flag + '\" correctionid=\"-1\">' + escape(out.n[i]) + nSpace[i] + "</span>";
          } else {
            var pre = "";
    
            for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
              pre += '<span type="del" style=\"background-color:#ffa2ad\" groupid=\"' + flag + '\" correctionid=\"-1\">' + escape(out.o[n]) + oSpace[n] + "</span>";
            }
			flag+=1;
            str += "" + out.n[i].text + nSpace[i] + pre;
          }
        }
      }
      
      return str;
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
    "url": apiURL+ "/userdata?userid="+userEntity.Id,
    "method": "GET"
}

    $.ajax(settings).done(function (response) {
      $(".paragraphsCorrected").html(response.numSubmissions);
        $(".wordsCorrected").html(response.totalWords);
        $(".minutesSpent").html(Math.round(response.totalTime/60000));
        sentenceNumber = response.numSubmissions+1;
        $('.sentenceNo').html(sentenceNumber);
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
    $(".scrollable").html("");
});

$("#collapse").click(function(){
    $("#originalTextDiv").slideToggle();
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
    getUserData();
    
    $.ajax(settings).done(function (response) {
        var text = response.text;
        $('#editableText').val(text);
        $('#originalTextP').html(text);
        textId = response._id;
        originalText = text;
    });
    
}

function getDiff(){
        var diffResult = diffStringModified(originalText,$('#editableText').val());
    
        xmlDoc = $.parseHTML( diffResult )
        $('#submitButton').attr("disabled","disabled");
        correctionsArray = [];
    
        var text, parser, xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(diffResult,"text/html");
        
        var insIndex = 0;
        var delIndex = 0;        
       
        $('#textDiff').html(diffResult);
        $("#numPending").html(diffResult.match(/<span/g)!==null ? diffResult.match(/<span/g).length:0);
    
        $('#textDiff span').on("click",function(event){
            
            var textDiffText = $('#textDiff').html();
   
            var card = cardTemplate.clone();

            if($(this).attr("type")==="del"){
                var wrong = "Deleted ' "+$(this).html()+"'";
                card.find('.wrongWord').html(wrong);
                card.find('.correctWord').html("");
                card.attr("data-cardType","deletion");
            }
            else{
                var correct = "Added ' "+$(this).html()+"'";
                card.find('.wrongWord').html(correct);
                card.find('.correctWord').html("");
                card.attr("data-cardType","deletion");
            }
            
            
            var currentSpan = $(this);
            var index = currentSpan.attr("correctionid");
            
            if(currentSpan.hasClass("corrected") && correctionsArray[index].category === "Spelling")
                card.find('.spellingBtn').addClass('clickedButton');
            else if(currentSpan.hasClass("corrected") &&  correctionsArray[index].category === "Grammar")
                card.find('.grammarBtn').addClass('clickedButton');
            else if(currentSpan.hasClass("corrected") &&  correctionsArray[index].category === "Punctuational")
                card.find('.punctuationBtn').addClass('clickedButton');
            
            card.find('.CategoryButton').on("click", function(){
                console.log(correctionsArray);
                
                
                $('.categoryCard').hide('slow', function(){
                    $('.categoryCard').remove();
                });
                
                $(this).parent().siblings().find('.CategoryButton').removeClass('clickedButton');
                $(this).toggleClass('clickedButton');
                
                if(currentSpan.hasClass("corrected")){
                    
                    var correctionObj = correctionsArray[index];
                    correctionObj.category=$(this).html();
                    correctionsArray[index] = correctionObj;
                }
                else{
                    $("#numPending").html($("#numPending").html()-1);
                    
                    if($("#numPending").html() === "0")
                        $('#submitButton').removeAttr("disabled");
                  
                    alert(currentSpan.html().length);
                    var offset = getOffset(diffResult,currentSpan);
                    var correctionObj = {
                        "wrongWord": currentSpan.html(),
                        "offset_start": offset,
                        "offset_end": currentSpan.attr("type")==="del" ? +(offset) + +(currentSpan.html().length) : offset,
                        "category":$(this).html()
                    }
                    
                    currentSpan.removeAttr("style");
                    currentSpan.addClass("corrected");
                    correctionsArray.push(correctionObj);
                    currentSpan.attr("correctionid",correctionsArray.length-1);
                }
            })   
                 
            $('body').append(card);
            if($(window).width()-(event.pageX+570)<0)
                $('.categoryCard').offset({top: event.pageY+15, left: $(window).width()-590});
            else
                $('.categoryCard').offset({top: event.pageY+15, left: event.pageX});
        })
}

$(document).mouseup(function(e) {
    var container = $('.categoryCard');
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.remove();
    }
});

function loadCards(){
        $('.scrollable').html("");
        var diffResult = diffString(originalText,$('#editableText').val());
        var text, parser, xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(diffResult,"text/html");

        correctionsArray = getCorrectionOffsets(originalText,$('#editableText').val());
    
        $("#numPending").html(correctionsArray.length);
        
        var insIndex = 0;
        var delIndex = 0;
        
        for(var i=0; i<correctionsArray.length; i++){
            var card = cardTemplate.clone();
            
            if(correctionsArray[i].type === "insertion"){
                var wrong = "";
                var correct = xmlDoc.getElementsByTagName("ins")[insIndex].innerHTML;
                insIndex+=1;
            }
            else if(correctionsArray[i].type === "deletion"){
                var wrong = xmlDoc.getElementsByTagName("del")[delIndex].innerHTML;
                var correct = "";
                delIndex+=1;
            }
            else if(correctionsArray[i].type === "replacement"){
                var wrong = xmlDoc.getElementsByTagName("del")[delIndex].innerHTML;
                var correct = xmlDoc.getElementsByTagName("ins")[insIndex].innerHTML;
                insIndex+=1;
                delIndex+=1;
            }
            
            card.find('.wrongWord').html(wrong);
            card.find('.correctWord').html(correct);
            card.attr("data-cardType",correctionsArray[i].type);

            card.find(".collapseTrigger").attr("data-target","#collapsible"+i);
            
            card.find(".collapsible").attr('id',"collapsible"+i);
            
            card.find('.CategoryButton').on("click", function(){
                $(this).parent().siblings().find('.CategoryButton').removeClass('clickedButton');
                $(this).toggleClass('clickedButton');
                $("#numPending").html($("#numPending").html()-1);
            })
            
            

            $('.scrollable').append(card.clone());
        }
        
        
    }

$(document).ready(function(){
    
    $('.categoryCard').hide();
    
    $spinner.hide();
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
    $('#gotoTwo').on("click",loadCards);
    
    $('.confirmSubmit').on("click",function(){
        var submissionObj = {
            "userId":userId,
            "time":timeTaken,
            "corrections":correctionsArray,
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
              //$('#showChangeCkBx').prop('checked', false);
              $('#originalTextP').html(originalText);
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
//function getCorrectionOffsets(oldText,newText){
//    var corrections = []
//    var correctionsObj = {};
//    var str = diffString(oldText,newText);
//    
//    while(str.match(/<ins>[\w\s.]+<\/ins>/) !==null || str.match(/<del>[\w\s.]+<\/del>/) !== null){
//        if(str.match(/<ins>[\w\s.]+<\/ins>/) !==null && str.match(/<del>[\w\s.]+<\/del>/) !== null){
//            if(str.match(/<ins>[\w\s.]+<\/ins>/).index<str.match(/<del>[\w\s.]+<\/del>/).index){
//                correctionsObj.type="insertion";
//                correctionsObj.offset=str.match(/<ins>[\w\s.]+<\/ins>/).index;
//                str = str.replace(/<ins>[\w\s.]+<\/ins>/,"");
//            }
//            else if(str.match(/<ins>[\w\s.]+<\/ins>/).index>str.match(/<del>[\w\s.]+<\/del>/).index){
//                if(str.match(/<del>[\w\s.]+<\/del>/).index === str.replace(/<del>[\w\s.]+<\/del>/,"").match(/<ins>[\w\s.]+<\/ins>/).index){
//					correctionsObj.type="replacement";
//                    correctionsObj.offset=str.match(/<del>[\w\s.]+<\/del>/).index;
//                    str = str.replace("<del>","");
//                    str = str.replace("</del>","");
//                    str = str.replace(/<ins>[\w\s.]+<\/ins>/,"");
//                }
//                else{
//                    correctionsObj.type="deletion";
//                    correctionsObj.offset=str.match(/<del>[\w\s.]+<\/del>/).index;
//                    str = str.replace("<del>","");
//                    str = str.replace("</del>","");
//                }
//            }
//        }
//        else if(str.match(/<ins>[\w\s.]+<\/ins>/) ===null && str.match(/<del>[\w\s.]+<\/del>/) !== null){
//            correctionsObj.type="deletion";
//            correctionsObj.offset=str.match(/<del>[\w\s.]+<\/del>/).index;
//            str = str.replace("<del>","");
//            str = str.replace("</del>","");
//        }
//        else if(str.match(/<ins>[\w\s.]+<\/ins>/) !==null && str.match(/<del>[\w\s.]+<\/del>/) === null){
//            correctionsObj.type="insertion";
//            correctionsObj.offset=str.match(/<ins>[\w\s.]+<\/ins>/).index;
//            str = str.replace(/<ins>[\w\s.]+<\/ins>/,"");
//            
//        }
//        corrections.push(Object.assign({}, correctionsObj));
//    }
//        return corrections;
//}

function getOffset(diffResult,currentSpan){
    var n = diffResult.indexOf(currentSpan[0].outerHTML);
    
    var subStr = diffResult.substring(0,n);
    
    while(subStr.match(/<span\b[^>]*>/gi)!==null){
        subStr = subStr.replace(/<span\b[^>]*>/gi,"");
    
    }
        
    
    while(subStr.match(/<\/span>/gi)!==null)
        subStr = subStr.replace(/<\/span>/gi,"")
    
    return subStr.length;
}