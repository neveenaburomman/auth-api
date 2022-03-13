'use strict';

const express =require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Users}=require('../models/index');

const basicAuth = require('../middleware/basicAuth.middleware');
const Bearer =require('../middleware/bearer.middleware');
const acl =require('../middleware/acl.middleware');



router.post('/signup',signupFunc);
router.post ('/signin',basicAuth,signinFunc)
router.get('/user',Bearer, userHandler)


router.get('/test', Bearer, acl('read'), (req, res) => {
    res.send('you can read this page');
});
router.post('/test', Bearer, acl('create'), (req, res) => {
    res.send('you can create in  this page');
});
router.put('/test', Bearer, acl('update'), (req, res) => {
    res.send('you can update in  this page');
});
router.delete('/test', Bearer, acl('delete'), (req, res) => {
    res.send('you can delete in this page');
});


async function signupFunc(req, res) {
    const { username, password } = req.body;
    console.log(`${username} =>> ${password}`);
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        console.log( hashedPassword)
        
        const newUser = await Users.create({
            username: username,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
}

async function signinFunc(req,res){
    res.status(200).send(req.user)
}

async function userHandler(req, res) {
    
    res.status(200).json(req.user);

}

module.exports =router;
