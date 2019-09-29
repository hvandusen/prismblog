var fs = require('fs');
var _ = require('underscore');
var mongoose = require('mongoose');
var Datauri = require('datauri');
var svg2png = require('svg2png')
//mongoose.connect('mongodb://henry:henryvd1@ds059702.mongolab.com:59702/candusenhub');
mongoose.connect('mongodb://localhost/candusenhub');
var db = mongoose.connection;
var Blogshape = require('./models/blogshape');
var paper = require('paper');
var ejs = require('ejs');
var express = require('express')
var twilio = require('twilio')
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
var twil_client = require('twilio')('ACcd6586f5cbe5bbbb2759e3349c0f0603', '5c12f398f18492d6cd20e0bd62c769e3');


Blogshape.find(function(err,docs){
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
    svg2png('output.svg','new.png',function(err){
        Datauri('new.png', function (err, content) {
          if (err) {
            throw err;
          }
          twil_client.sendMessage({
              to:'+12024927472', // Any number Twilio can deliver to
              from: '+12015913520', // A number you bought from Twilio and can use for outbound communication
              body: 'does this god damn work ;(.', // body of the SMS message
              MediaUrl: content
          }, function(err, responseData) { //this function is executed when a response is received from Twilio
              if (!err) { // "err" is an error received during the request, if any
                  console.log(responseData.from); // outputs "+14506667788"
                  console.log(responseData.body); // outputs "word to your mother."
              }
        });
      })
        })





  });
}
