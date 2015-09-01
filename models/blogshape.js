var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
//var Post = require('Post');

var shapeSchema = new Schema({
    dateCreated: {type: Date, default: Date.now},
    svg: {type: String},
    date:{type: String}
});

module.exports = mongoose.model('Blogshape', shapeSchema);
