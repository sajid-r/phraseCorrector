'use strict';

var fs = require('fs');
var express = require("express");
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


module.exports = function(app) {
  var controller = require('../controllers/controller');

  // controller Routes
  app.route('/user')
    .get(controller.getUser)

  app.route('/submission')
    .get(controller.getsubmissions)

  app.route('/data')
    .get(controller.getdata)

  app.route('/text')
    .get(controller.getText)

  app.route('/user')
    .post(controller.createuser)

  app.route('/submission')
    .post(controller.createsubmission)

  app.route('/text')
    .post(controller.updateText)

  app.route('/userdata')
    .get(controller.getUserData)
}
