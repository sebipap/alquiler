// IMPORTS
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

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




app.listen(5000, () => console.log('[OK] Server en puerto 5000'))
