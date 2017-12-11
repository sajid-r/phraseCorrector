'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var submissions = new Schema({
  submissionId:String,
  userId:String,
  time:Number,
  corrections:Array,
  timeStamp:Date,
  textId:String
},{ collection : 'submissions' });

var users = new Schema({
  userId:String,
  email:String,
  name:String,
  imageurl:String
},{ collection : 'users' });

var data = new Schema({
  textId:Number,
  text:String,
  correctionCount:Number,
  correctionId:String,
  activeCorrections:Array
},{ collection : 'data' });

module.exports = mongoose.model('users', users);
module.exports = mongoose.model('submissions', submissions);
module.exports = mongoose.model('data', data);
