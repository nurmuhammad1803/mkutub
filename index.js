import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './auth.js';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
// import * as PostController from './controllers/PostController.js';

mongoose.connect('mongodb+srv://nurmuhammad1803:nurgamer1803@cluster0.lu7llic.mongodb.net/blog?retryWrites=true&w=majority').then(() => { console.log('DB ok') }).catch((err) => console.log('DB error: ', err))


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})
app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

// app.get('/posts', checkAuth, PostController.getAll)



// Listening port 4444
app.listen(4444, (err) => {
    if (err) return console.log(err)

    console.log('OK')
})