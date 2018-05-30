var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

//creates the comment model
var Comment = mongoose.model("Comment", CommentSchema);

//exports the comment model
module.exports = Comment;