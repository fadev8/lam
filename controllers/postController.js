const Post = require('../models/post');

exports.addPost = async (req, res, next)=>{
    try{
        const post = await Post.create(req.body);
        const posts = await Post.find().sort({postedat:"descending"});
        console.log(post);
        res.render('home',{
            user:{
                name:'Faden',
                _id:""+post.porterid
            },
            posts:posts
        }); 
    }catch(err){
        //res.render('welcome',{error:err});
        console.log(err);
    }
    next();
}