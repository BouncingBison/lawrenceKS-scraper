// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the comment schema
var CommentSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});


// Create the Note model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;