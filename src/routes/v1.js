'use strict';

const express =require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Users}=require('../models/index');

const basicAuth = require('../middleware/basicAuth.middleware');
const bearerAuth=require("../middleware/bearer.middleware");


router.post('/signup',signupFunc);
router.post ('/signin',basicAuth(Users),signinFunc)
router.get('/user',bearerAuth(Users), userHandler)




async function signupFunc(req, res) {
    const { username, password ,role } = req.body;
    console.log(`${username} =>> ${password}`);
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        console.log( hashedPassword)
        
        const newUser = await Users.create({
            username: username,
            password: hashedPassword,
            role:role
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
