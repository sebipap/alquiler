const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validation')
const verify = require('../verifyToken')


router.post('/register', async (req, res) => {

    // validar datos antes de crear el usuario

    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // checkear si el mail ya esta registrado

    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Ya existe una cuenta con ese mail!")
    
    // encriptar la password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // crear usuario

    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: hashPassword
    }
    )
 
    try{
        const savedUser = await user.save()

        res.send({user: user.id})

        console.log("usuario registrado")
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/login',async (req, res) => {

    // validar datos antes de hacer login

    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // chequear si el mail esta registrado

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Usuario no registrado")

    // chequear si coincide la contraseña

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Contraseña incorrecta")

    // crear token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)


    console.log("usuario login " + req.body.email)
})

router.post('/reset', verify, async (req, res) => {
    const newPassword = req.body.newPassword
    const userId = req.user._id
    const user = await User.findById(userId)
    const realPassword = user.password

    const isValid = await bcrypt.compare(req.body.oldPassword, realPassword)

    if(isValid){
            // encriptar la password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(newPassword, salt)

            user.password=hashPassword
        try{
            await user.save()
            res.send('ok')

        }catch(e){
            res.status(400).send(e)
        }

    }else{
        res.status(400).send('Contraseña incorrecta')
    }

})

module.exports = router
