//var apiURL = "https://labsdev.knolskape.com:8083";
var apiURL = "http://localhost:3000";

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