var jsdom = require('jsdom')
const { JSDOM } = jsdom
var fs = require("fs")
var paper = require("paper")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hvandusen:"+process.env.MONGO_PW+"@hankscluster-dtp7l.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })
const express = require('express');
const nunjucks = require('nunjucks');
let svgs = []
var mostRecentPost = new Date(0);
var ONE_DAY = 60 * 60 * 1000*24;
var paginate = 20;

updateSvgs();

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
  let pages = Math.floor(svgs.length/paginate);
  if(new Date() - ONE_DAY > mostRecentPost)
    updateSvgs();
  else {
    console.log("fetched recently enough")
  }
    res.render('index.html',{pages: pages,page:1,data: svgs.slice(0,paginate)});
});

app.get('/page/:page', function(req, res) {
  let thePage = parseInt(req.params.page);
  let pages = Math.floor(svgs.length/paginate);
  if(thePage>pages)
    thePage = 1
    res.render('index.html',{pages:Math.floor(svgs.length/paginate),page:thePage,data: svgs.slice((thePage-1)*paginate,(thePage*paginate)%svgs.length)});
});

app.listen(process.env.PORT ? process.env.PORT : 3332);

function getNewShape(){
  const dom = new JSDOM('<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title></title></head><body></body></html>')
  var {execute} = paper.PaperScript;
  var c = dom.window.document.createElement("canvas")
  c.width = 1000
  c.height = 1000
  paper.setup(c)
  paper.activate()
  var text = fs.readFileSync("./prism2.pjs").toString()
  execute(text,paper)
  return paper.project.exportSVG({
    asString: true,
    matchShapes: true
  })
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function updateSvgs(){
  client.connect(err => {
    if(err){
      console.log(err)
    }
    const collection = client.db("prism-blog").collection("shapes")
    collection.find().sort({date: -1}).toArray()
    .then( data => {
        mostRecentPost = new Date(data[0].date)
      console.log('most recent: ',mostRecentPost)
      svgs = [ ...data ];
      console.log("there are this many shapes :) ",svgs.length)
      client.close()
    })


  });
}
