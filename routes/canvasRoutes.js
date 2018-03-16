const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const canvas = require('../models/canvas');


//save canvas JSON objects to the database
router.post('/addCanvas' ,(req, res ,next) => {
    let newCanvas = new canvas ({
        CanvasName:req.body.CanvasName,
        Username :req.body.Username ,
        CanvasElement:req.body.CanvasElement
    });
    console.log('routes'+ newCanvas);
    canvas.addCanvas(newCanvas,(err, canvas) =>{

        if (err){
            res.json({success: false ,msg :'Failed to add canvas'});
        }else
        {
            res.json({success :true, msg :'canvas saved'})
        }
    })
} );



module.exports = router;



