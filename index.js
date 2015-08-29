var fs = require('fs');
var _ = require('underscore');
var paper = require('paper');
var express = require('express')
var app = express();
app.use(express.static(__dirname + '/public'));
var server = app.listen( 3033 );
var schedule = require('node-schedule');
app.set('view engine','ejs')
var posts = [];
app.get('/', function (request, response) {
    response.render('index',{posts: posts});
});

//add initial
var scope = require('./prism2.pjs')(new paper.Size(800, 700));
posts.push({
  svg: scope.project.exportSVG({'asString':true}),
  date: Date().split(' ').splice(0,4).join(' ')
});

var j = schedule.scheduleJob('* * * * *', function(){
    everyDay()
    console.log('added shape. posts is '+posts.length+' long now');

});

function everyDay(){
  scope = require('./prism2.pjs')(new paper.Size(800, 700));
  posts.push({
    svg: scope.project.exportSVG({'asString':true}),
    date: Date().split(' ').splice(0,4).join(' ')
  });
}



fs.writeFile("circle.svg", '<svg>'+scope.project.exportSVG({'asString':true})+'</svg>', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
