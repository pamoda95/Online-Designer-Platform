var expect  = require('chai').expect;
var request = require('request');



describe('status and content',function () {

    describe('app ',function () {

        it('status', function(done){
            request('http://localhost:3000/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:300/' , function(error, response, body) {
                expect(body).to.equal();
                done();
            });
        });

    });
    //
    // describe('users',function () {
    //     it('status ',function (done) {
    //         request('http://localhost:300/users',function (error,response,body) {
    //             expect(response.statusCode).to.equal(404);
    //             done();
    //         })
    //     })
    //
    // });




});



