var expect =require('chai').expect;
var Canvas =require('../models/canvas');
var mongoose =require('mongoose');

describe('canvas',function () {

    var canvasSchema= new mongoose.Schema({
        CanvasName:{type : String ,required :true },
        firstCanvas : {type :Boolean},
        repost:{
            type:Boolean ,
            validate: function(v) {
                return v === true && this.firstCanvas === true;
            }
        }
    });


    before(function (done) {
        mongoose.connect('mongodb://pamoda:pamoda@ds219130.mlab.com:19130/designer');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });

    it('it should be invalid if name is empty ',function (done) {
        var usr =new Canvas();

        usr.validate(function (err) {
            expect(err.errors.CanvasName).to.exist;
            done();

        })
    }) ;


    it('should be valid repost when pamo ',function (done) {

        var usr =new Canvas({repost:true,firstCanvas:true});

        usr.validate(function (err) {
            expect(err.errors.repost).to.not.exist;
            done();
        })

    })


    //After all tests are finished drop database and close connection
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

});