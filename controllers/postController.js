const Post = require('../models/post');
const Features = require('../utils/featers');

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
       // console.log(err);
    }
    next();
}

exports.getAllPosts = async (req, res, next) => {
    try{
        const features = new Features(Post.find(),req.query).filter().sort().limitFields().paginate();
        const posts = await features.query;
        res.status(200).json({
            status:'success',
            data:{
                results:posts.length,
                posts
            }
        });
    }catch(err){
        //res.render('welcome',{error:err});
        res.status(200).json({
            status:'fail',
            err
        });
    }
    next();
}