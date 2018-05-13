var expect =require('chai').expect;
var User =require('../models/user');
var mongoose =require('mongoose');

describe('user',function () {

    var userSchema= new mongoose.Schema({
        name:{type : String ,required :true },
        pamo : {type :Boolean},
        repost:{
            type:Boolean ,
            validate: function(v) {
                return v === true && this.pamo === true;
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
        var usr =new User();

        usr.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();

        })
    }) ;


    it('should be valid repost when pamo ',function (done) {
        
        var usr =new User({repost:true,pamo:true});
        
        usr.validate(function (err) {
            expect(err.errors.repost).to.not.exist;
            done();
        })
        
    });

    // it('should retrieve data from test database',function (done) {
    //     User.getUserByUsername({name:'pamo'},(err,name)=>{
    //         if (err){throw err}
    //         if(name.len==0){throw new Error('no data!');}
    //     });
    // });


    //After all tests are finished drop database and close connection
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });


});