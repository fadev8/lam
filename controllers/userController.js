const User = require('../models/users');
const Post = require('../models/post');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUser = (req, res, next)=>{
    console.log(req.body);
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
}