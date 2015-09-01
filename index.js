var fs = require('fs');
var _ = require('underscore');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://henry:henryvd1@ds059702.mongolab.com:59702/candusenhub');
mongoose.connect('mongodb://localhost/candusenhub');
var db = mongoose.connection;
var Blogshape = require('./models/blogshape');
var paper = require('paper');
var ejs = require('ejs');
var express = require('express')
var app = express();
app.use(express.static(__dirname + '/public'));
var server = app.listen( 3033 );
var schedule = require('node-schedule');
app.set('view engine','ejs')
var posts = [];
app.get('/', function (request, response) {
    response.render('index',{posts: svgs});
});
var svgs;
var scope;
Blogshape.find(function(err,docs){
  console.dir(docs.length)
  svgs = docs;
});
db.on('error', console.error.bind(console, 'connection error:'));
//
everyDay();

var j = schedule.scheduleJob('* * * * *', function(){
    everyDay()
});

function everyDay(){
  scope = require('./prism2.pjs')(new paper.Size(800, 700));
  pic = new Blogshape({
    svg: scope.project.exportSVG({'asString':true}),
    date: Date().split(' ').splice(0,4).join(' ')
  });
  pic.save(function(err,docs){
    Blogshape.find(function(err,docs){
      svgs = docs;
    });
  });
}
