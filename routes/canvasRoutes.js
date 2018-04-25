const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const canvas = require('../models/canvas');


//save canvas JSON objects to the database
router.post('/addCanvas' ,(req, res ,next) => {

    console.log(req.body);

    let newCanvas = new canvas ({
        CanvasName: "name",
        Username :req.body.Username ,
        CanvasElement: req.body.CanvasElement
    });
    console.log('routes'+ newCanvas);
    canvas.addCanvas(newCanvas,(err) =>{

        if (err){
            console.log(err);
            res.json({success: false ,msg :'Failed to add canvas'});
        }else
        {
            res.json({success :true, msg :'canvas saved'})
        }
    })
} );

// Get Canvas
router.get('/getCanvas/:username/:canvasName', (req, res, next) => {
    canvas.getCanvas({Username: req.params.username, CanvasName: req.params.canvasName}, (err, canvas) => {
           if(err) throw err;
           res.json({success: true, canvas: canvas,  msg: "Canvas Fetched!"})
    })
});


module.exports = router;



