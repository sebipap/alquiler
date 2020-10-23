const router = require('express').Router()
const verify = require('../verifyToken')

// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'postsImg')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })   
// const upload = multer({ storage: storage })

const Post = require('../models/Post')
const Review = require('../models/Review')
const Question = require('../models/Question')
const User = require('../models/User')

//file management
const multer = require('multer')
const upload = multer()
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// Get all posts
router.get('/', async (req, res) =>{
    const allPosts = await Post.find()

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
})

// SINGLE POST

// Get one post by id
router.get('/:id', verify, async(req, res) =>{
    const post = await Post.findById(req.params.id)
    const reviews = await Review.find({post_id: req.params.id})
    const questions = await Question.find({post_id: req.params.id})

    const isOwner = (post.user_id === req.user._id)

    res.send({
        post: post, 
        reviews: reviews, 
        questions: questions,
        isOwner: isOwner
    })
})
// Post a Post
router.post('/', upload.single("file"), verify, async (req, res) =>{
    
    const fileName = req.body.title + Date.now() +req.file.detectedFileExtension

    const post = new Post({
            user_id: req.user, //esto viene del modulo verify
            title: req.body.title,
            body: req.body.body,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            base_price: req.body.base_price,
            night_price: req.body.night_price,
            img_url: 'postsImg/' + fileName
        })

        console.log(req.file)

    try{
        await pipeline(req.file.stream, fs.createWriteStream(`${__dirname}/../postsImg/${fileName}`))
        const savedPost = await post.save()

        res.status(200).send({
            msg: "Publicación realizada!",
            post: savedPost})
    }catch(e){
        res.status(400).send(e)
    }
 

})
// Delete a Post
router.delete('/:id',verify, async(req, res) =>{
    const post = await Post.findById(req.params.id)

    if(req.user._id === post.user_id){
        try{
            await post.delete()
            res.status(200).send({
                msg: "Publicación eliminada"})
      
        }catch(e){
            res.status(400).send(e)
        }
    }else{
        res.status(401).send('No está autorizado!')
    }


})
// Post a review
router.post('/:id/review',verify, async(req, res)=>{
    const review = new Review({
        user_id: req.user,
        post_id: req.params.id,
        body: req.body.body,
        rating: req.body.rating
    })
    try{
        const savedReview = await review.save()

        res.status(200).send("Review realizada!")
    }catch(e){
        res.status(400).send(e)
    }

})
// Post a question
router.post('/:id/question',verify, async(req, res)=>{
        
    const question = new Question({
        user_id: req.user,
        post_id: req.params.id,
        body: req.body.body,
    })
    try{
        const savedQuestion = await question.save()

        res.status(200).send("Pregunta realizada!")
    }catch(e){
        res.status(400).send(e)
    }

})
// Post an answer to a question
router.post('/:postId/answer/:questionId',verify, async(req, res)=>{

    const post = await Post.findById(req.params.postId)
    const owner_id = post.user_id
    const user_id = req.user._id //desde verify
    
    const answer = req.body.body

    const question = await Question.findById(req.params.questionId)

    if(owner_id == user_id){
        question.answer = answer
        question.save()
        res.status(200).send("Respuesta enviada!")
    }else{
        return res.status(400).send("No es el dueño de la publicación")
    }

})


module.exports = router