const router = require('express').Router()
const verify = require('../verifyToken')

const Post = require('../models/Post')
const Review = require('../models/Review')
const Question = require('../models/Question')
const User = require('../models/User')


router.get('/info', verify, async (req, res) => {

    const user_id = req.user
    const user = await User.findById(user_id)
    res.send(user)

})

router.get('/posts', verify, async (req, res) =>{
    const allPosts = await Post.find({user_id: req.user})

    const postsResponse = allPosts.map(post=>{
        return {
            title: post.title,
            body: post.body,
            _id: post._id,
            base_price: post.base_price,
            night_price: post.night_price,
            img_url: post.img_url
            }
    })
    res.send(postsResponse)
    console.log(allPosts)
})


module.exports = router