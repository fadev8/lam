const express = require('express');
const api = express.Router();
const User = require('../models/users');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const saltRounds = 10;




api.get('/', (req, res) => {

    res.render("welcome", { error: null });
});

//==========================================================================
//================ SIGN UP ==================
api.post('/', (req, res, next) => {
    //============BACKEND FOR SIGNUP============
    //console.log(sha1("faden"));
    if (req.body.signname && req.body.signtel && req.body.signpass
    ) {
        var name = req.body.signname,
            tel = req.body.signtel,
            pass = req.body.signpass;

        User.findOne({ phone: tel }, (err, data) => {
            if (data) {
                //if the phone is already used, we prompt the user to change it
               // console.log(data);
                res.render('welcome', { error: "Phone already used. Chose another" });
            } else {
                bcrypt.hash(pass, saltRounds, (err, hashedpass) => {
                    //console.log(pass+" => "+hashedpass);
                    var newUser = new User({
                        name: name,
                        phone: tel,
                        password: hashedpass
                    });

                    //hashing the password

                    var ret = newUser.save();
                   
                    //after saving, login immediately
                    res.render('welcome',{error:"Successful ! \n Login now..."});

                })
            }
        });




    } else {
        next();
    }

});

//===================================================
//============== LOGIN ============================
api.post("/", (req, res, next) => {
    //========== BACKEND FOR LOGIN =================
    if (req.body.logintel && req.body.loginpassword) {
        var usertel = req.body.logintel;
        var userpass = req.body.loginpassword;
        //console.log(usertel + " " + userpass);

        User.findOne({ phone: usertel }, (err, user) => {
           // console.log(' after save '+user);
            if (user) {
                bcrypt.compare(userpass, user.password, (err, val) => {
                    if (val) {
                        //picking all the postes
                        Post.find()
                            .sort({postedat:"descending"})
                            .exec((err, postarray)=>{
                                res.render('home',{user:user,posts:postarray});
                            });
                        
                    }else{
                        res.render('welcome',{error:"Phone or Password incorrect !"})
                    }
                });
            }else{
                res.render('welcome',{error:"Account not found !"})
            }
        });


    } else {
        next();
    }
});

//===================================================
//========= CREATING A POST =========================
api.post("/", (req, res, next) => {
    //creer un nouveau post
    if (
        req.body.postuserid &&
        req.body.postusername &&
        req.body.posttext ||
        req.body.postphoto ||
        req.body.postvideo
    ) {
        //upload the file and save the model
        var postuserid = req.body.postuserid;
        var postusername = req.body.postusername;
        var posttext = req.body.posttext;
        var postphoto = req.body.postphoto;
        var postvideo = req.body.postvideo;

        newPost = new Post({
            posterid:postuserid,
            postername:postusername,
            text:posttext,
            photo:postphoto,
            video:postvideo
        });

        newPost.save();

        res.render('home',{user:user});

    } else {
        next();
    }
});






//exporting the module
module.exports = api;