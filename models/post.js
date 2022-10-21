const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining a schema here
var postSchema = new Schema({
    posterid:{type:String},
    postername:{type:String},
    text:{type:String, required:true},
    photo:{type:String},
    video:{type:String},
    likes:[],
    comments:[],
    postedat:{type:Date,default:Date.now}
});


var PostModel = mongoose.model("Post",postSchema);
module.exports = PostModel;