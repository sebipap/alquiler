// IMPORTS
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000

// Importar Routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')

// CONNECT DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('[OK] DB Conectada'))



// MIDDLEWARE
app.use(express.json())
app.use('/postsImg',express.static('postsImg'))

//Route middlewares
app.use('/api/auth', authRoute) 
app.use('/api/posts', postsRoute)
app.use('/api/user', userRoute)

//  For Production use

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'))
    app.get('*', (req, res) =>{
        res.sendFile(path.join('../build/index.html'))
    })
}

app.listen(PORT, () => console.log('[OK] Server en puerto' + PORT))
