const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const canvas = require('../models/canvas');



router.post('/addCanvas' ,(req, res ,next) => {
    let newCanvas = new canvas ({
        CanvasName:req.body.CanvasName,
        Username :req.body.Username ,
        CanvasElement:req.body.CanvasElement
    });
    canvas.addCanvas(newCanvas,(err, canvas) =>{

        if (err){
            res.json({success: false ,msg :'Failed to add canvas'});
        }else
        {
            res.json({success :true, msg :'canvas saved'})
        }
    })
} );

// router.post('/register', (req, res, next) => {
//     let newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     });
//
//     User.addUser(newUser, (err, user) => {
//
//     });
// });


module.exports = router;



