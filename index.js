import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';

mongoose.connect('mongodb+srv://nurmuhammad1803:nurgamer1803@cluster0.lu7llic.mongodb.net/?retryWrites=true&w=majority').then(() => { console.log('DB ok') }).catch((err) => console.log('DB error: ', err))

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).send.json(errors.array())
    
    // {
    //     "email": "shaxzodatest@gmail.com",
    //     "fullName": "Shaxzoda",
    //     "password": "234234234"
    // }

    res.json({
        success: true,
    })
})

// Listening port 4444
app.listen(4444, (err) => {
    if (err) return console.log(err)

    console.log('OK')
})