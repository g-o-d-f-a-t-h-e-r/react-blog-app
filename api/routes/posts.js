const router = require("express").Router();
const User = require("../models/User");
const Post = require('../models/Post')
const Category = require('../models/Category')


// Create New Post
router.post('/', async(req, res) => {

    let categories = req.body.cat.split(' ')

    

    const newPost = new Post({
        title : req.body.title,
        desc : req.body.desc,
        photo : req.body.photo? req.body.photo : "",
        username : req.body.username,
        categories,
    });

    try{

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
        res.status(500).json(err);
    }
    

})


// Update a Post
router.put('/:id', async(req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            
            try {
                let categories = req.body.cat.split(' ')
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set:{
                        title : req.body.title,
                        desc : req.body.desc,
                        photo : req.body.photo? req.body.photo : "",
                        username : req.body.username,
                        categories,
                    }
                }, { new : true })
                res.status(200).json(updatedPost)

            } catch (err) {
                res.status(500).json(err);
            }

        }else{
            res.status(401).json("You can only update your post!");
        }
        


    } catch (error) {
        res.status(500).json(error);
    }
    
})



// Delete a Post
router.delete('/:id', async(req, res) => {

    try {
        
        const post = await Post.findById(req.params.id);

        if(post.username === req.body.username){

            try {
                await post.delete();
                res.status(200).json("Post Deleted Successfully!")
            } catch (err) {
                res.status(500).json(err)
            }

        }else{
            res.status(404).json("You can only delete your Post");
        }

    } catch (error) {
        res.status(500).json(error)
    }
    
})





// Get a Post
router.get('/:id', async(req, res) => {

    try {

        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error)
    }

    
})



// Get ALL POSTS
router.get('/', async(req, res) => {

    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if(username){
            posts = await Post.find({username});
        }
        else if(catName){
            posts = await Post.find({categories : {
                $in:[catName]
            }})
        }
        else{
            posts = await Post.find();
        }

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error)
    }

    
})




module.exports = router;