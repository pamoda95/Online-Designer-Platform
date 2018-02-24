const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// canvas Schema
const canvasSchema = mongoose.Schema({
    CanvasName: {
        type: String,
        required: true
    },

    Username :{
        type: String,
        required: true
    },

    CanvasElement :{
        type: Object,
        required: true
    },
});

const Canvas = module.exports = mongoose.model('Canvas', canvasSchema);


module.exports.addCanvas = function (newCanvas ,callback) {
    console.log("add canvas works");
    newCanvas.save(callback);
};



