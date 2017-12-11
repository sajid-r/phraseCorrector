'use strict';
var tz=require('moment-timezone'),
  mongoose = require('mongoose'),
  users = mongoose.model('users'),
  moment = require('moment'),
  request = require('request'),
  data = mongoose.model('data'),
  submissions = mongoose.model('submissions');

                //////////////////
                //  RETRIEVE    //
                //////////////////

exports.getUser = function(req,res) {
  if(req.query.email!==undefined){
    users.find({"email":req.query.email}, function(err,item){
      if(err)
        res.send(err);
      res.json(item);
    });
  }

  else if(req.query.userid!==undefined){
    users.find({"userId":req.query.userid}, function(err,item){
      if(err)
        res.send(err);
      res.json(item);
    });
  }
};

exports.getsubmissions = function(req,res) {
  if(req.query.userid!==undefined){
    submissions.find({"userId":req.query.userid}, function(err,item){
      if(err)
        res.send(err);
      res.json(item);
    });
  }
  else if(req.query.submissionid!==undefined){
    submissions.find({"submissionId":req.query.submissionid}, function(err,item){
      if(err)
        res.send(err);
      res.json(item);
    });
  }
};

exports.getdata = function(req,res) {
    data.find({"submissionId":req.query.submissionid}, function(err,item){
      if(err)
        res.send(err);
      res.json(item);
    });
};

exports.createuser = function(req,res) {
  //console.log(req.body.body);
  var newuser = new users(req.body.body);
  users.findOneAndUpdate({'email':newuser.email},newuser,{upsert: true},function(err,data){
    if(err)
      res.send(err);
    res.json(data);
  });
};

exports.createsubmission = function(req,res) {
  var newsubmission = new submissions(JSON.parse(req.body.body));
  newsubmission.save(function(err,data1){
    if(err)
      res.send(err);
    var submissionId = data1._id
    data.findOneAndUpdate({'_id':data1.textId},{'correctionId':submissionId},function(err,data2){
      if(err)
        res.send(err);
      res.send(data2);
    })
  })
}

exports.getText = function(req,res) {
  data.findOne({correctionCount:0, activeCorrections:null},function(err,data1){
    if(err)
      res.send(err);
    var dataParsed = data1;
    dataParsed.activeCorrections.push({
      userId:req.query.userid,
      timeStamp: new Date()
    })
    var newdata = new data(dataParsed)
    newdata.save(function(err,data2){
      if(err)
        res.send(err);
      res.json(data1);
  })
})
}

exports.createtext = function(req,res) {
  var newdata = new data(JSON.parse(req.body.body))
  newdata.save(function(err,data){
    if(err)
      res.send(err);
    res.json(data);
  })
}

exports.updateText = function(req,res) {
  var queryid = JSON.parse(req.body.body);
  var query = {'_id':queryid.id};
  var newobj = JSON.parse(req.body.body);
  data.findOneAndUpdate(query, newobj, {upsert:true},function(err,data){
    if(err)
      res.send(err);
    res.json(data);
  });
};


exports.getUserData = function(req,res) {
  submissions.find({"userId":req.query.userid}, function(err,data){
    if(err)
      res.send(err);
    var numSubmissions = data.length
    var totalTime = 0;
    var totalWords = 0;
    for(var i=0;i<data.length;i++){
      totalTime+=data[i].time;
      totalWords+=data[i].corrections.length;
    }
    res.json({numSubmissions,totalWords,totalTime});
  });
};
