const router = require('express').Router()
const verify = require('../verifyToken')
const Post = require('../models/Post')
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

// SINGLE POST

// Get one post by id
router.get('/:id', async(req, res) =>{
    const post = await Post.findById(req.params.id)
    const questions = await Question.find({post_id: req.params.id})
    const owner = await User.findById(post.user_id)

    res.send({
        post: post, 
        questions: questions,
        ownerName: owner.name,
        ownerEmail: owner.email
    })
}) 

// Get if user is owner

router.get('/owner/:id/', verify,  async (req, res) =>{

    const post = await Post.findById(req.params.id)

    res.send({
        isOwner: post.user_id == req.user._id 
    })
})


// Post a Post
router.post('/', upload.single("file"), verify, async (req, res) =>{
    
    const fileName = req.user._id + Date.now() + req.file.detectedFileExtension

    console.log("user ID: " + req.user._id)
    console.log("Date.now(): " + Date.now())
    console.log("req.file.detectedFileExtension: " + req.file.detectedFileExtension)


    console.log(fileName)

    const post = new Post({
            user_id: req.user, //esto viene del modulo verify
            body: req.body.body,
            price: req.body.price,
            year: req.body.year,
            km: req.body.km,
            make: req.body.make,
            model: req.body.model,
            img_url: 'postsImg/' + fileName
        })


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

// Edit a Post

router.post('/edit/:id', verify, async (req, res) =>{

    const post = new Post({
            user_id: req.user, //esto viene del modulo verify
            body: req.body.body,
            price: req.body.price,
            year: req.body.year,
            km: req.body.km,
            make: req.body.make,
            model: req.body.model,
            img_url: 'postsImg/' + fileName
        })


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

    const answer = req.body.body

    
    const post = await Post.findById(req.params.postId)
    const owner_id = post.user_id
    const user_id = req.user._id //desde verify
    

    const question = await Question.findById(req.params.questionId)


    console.log(post)
    console.log(answer)


    if(owner_id == user_id){
        question.answer = answer
        question.save()
        res.status(200).send("Respuesta enviada!")
    }else{
        return res.status(400).send("No es el dueño de la publicación")
    }

})


module.exports = router