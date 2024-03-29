const router = require("express").Router();
const Post = require("../models/Post")
const User=require("../models/User")

//create a post

router.post('/', async(req, resp)=>{
    const newPost= new Post(req.body)
    try{
        const savedPost= await newPost.save();
        resp.status(200).json(savedPost)

    } catch(err){
        resp.status(500).json(err)
    }
})

//update a post

router.put('/:id', async(req, resp)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            resp.status(200).json({message: 'Post is updated'})
        } else{
            resp.status(403).json({message: 'You can only update your post'})
        }
        
    } catch(err){
        resp.status(500).json(err)
    }
})

//delete a post

router.delete('/:id', async(req, resp)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            resp.status(200).json({message: 'Post is deleted'})
        } else{
            resp.status(403).json({message: 'You can only deleted your post'})
        }
        
    } catch(err){
        resp.status(500).json(err)
    }
})

//like and dislike a post

router.put('/:id/likes', async(req, resp)=>{

    try{
        const post= await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            resp.status(200).json("This post has been liked")

        } else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            resp.status(200).json("This post has been disliked")
        }

    } catch(err){
        resp.status(500).json(err)
    }

})

//get a post

router.get('/:id', async (req, resp) => {
    try {
      const post = await Post.findById(req.params.id);
      resp.status(200).json(post);
    } catch (err) {
      resp.status(500).json(err);
    }
  
  });
//get timeline post of user and it followings

router.get('/timeline/:userId', async (req, resp) => {
    try {
        // Get the current user
     const currentUser= await User.findById(req.params.userId);
     //  Get the posts of the current user
     const userPosts= await Post.find({userId: currentUser._id});
      // Get posts from the user's friends
     // promise.all waits for all of these promises to resolve.
     const friendsPosts= await Promise.all(
        currentUser.followings.map((friendId)=>{
            return Post.find({userId: friendId});
        })
     );

     // Combine and send back all posts
     resp.status(200).json(userPosts.concat(...friendsPosts))
     
    } catch (err) {
      resp.status(500).json(err);
    }
  
  });


  //get timeline post of user only

router.get('/profile/:username', async (req, resp) => {
    try {
        const user= await User.findOne({username: req.params.username});
        const posts= await Post.find({userId: user._id});
        resp.status(200).json(posts);
   
     
    } catch (err) {
      resp.status(500).json(err);
    }
  
  });

module.exports = router;
