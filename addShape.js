var jsdom = require('jsdom')
const { JSDOM } = jsdom
var fs = require("fs")
var paper = require("paper")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hvandusen:"+process.env.MONGO_PW+"@hankscluster-dtp7l.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })
let svgs = []

addSvg();

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

function addSvg(){
  client.connect(err => {
    if(err){
      console.log(err)
    }
    const collection = client.db("prism-blog").collection("shapes")
    // fs.writeFile("texst.svg",getNewShape());
      collection.insert({
        svg: getNewShape(),
        date: new Date()
      }).then( () => {
        client.close()
      })
  });
}
