const router = require('express').Router()
const verify = require('../verifyToken')

const Post = require('../models/Post')
const Question = require('../models/Question')
const User = require('../models/User')

// Get user's public info
router.get('/info', verify, async (req, res) => {

    const user_id = req.user
    const user = await User.findById(user_id)
    res.send(user)
})

// Get user's posts
router.get('/posts', verify, async (req, res) =>{
    const allPosts = await Post.find({user_id: req.user})

    const postsResponse = allPosts.map(post=>{
        return {
            _id: post._id,
            body: post.body,
            price: post.price,
            year: post.year,
            km: post.km,
            make: post.make,
            model: post.model,
            img_url: post.img_url
            }
    })
    res.send(postsResponse)
})


module.exports = router