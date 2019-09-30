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

var addDateToItem = function (item) {
  console.log("id: ", item._id.id.toString())
	return { ...item, date: new Date(parseInt(item._id.id.substring(0, 8), 16) * 1000)};
};

updateSvgs();

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function(req, res) {
    res.render('index.html',{data: svgs});
});

app.listen(3332);

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



function updateSvgs(){
  client.connect(err => {
    if(err){
      console.log(err)
    }
    const collection = client.db("prism-blog").collection("shapes")
    collection.find().toArray().
    then( data => {
      svgs = data.map(addDateToItem)
      console.log("there are this many shapes :) ",svgs.length)
      client.close()
    })


  });
}
