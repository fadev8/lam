const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const SALT_FACTOR = 10;


var userSchema = new Schema({
    name : {type:String, required:true},
    phone : {type:String, require:true,unique:true},
    dob : {type:Date},
    livein : {type:String},
    workat : {type:String},
    summary : {type:String},
    password : {type:String, required:true},
    joinat : {type:Date, default: Date.now}
});


//adding methods to the schema
userSchema.methods.fullname = function(){
    return this.name;
}

userSchema.methods.anciennete = function(){
    return Date.now - this.joinat;
}





//creating and exporting the model
const User = mongoose.model("User",userSchema);;
module.exports = User; 