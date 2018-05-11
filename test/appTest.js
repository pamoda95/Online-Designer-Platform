var assert =require('chai').assert;
var  sayHello =require('../models/user').sayHello();

// const chai = require('chai');
// const assert = chai.assert;

// describe('App',)

describe('App',function () {
    it('should return hello', function () {
        let result =sayHello();
        assert.equal(result,'hello');
    });

    it('should return type string', function () {
        let result =sayHello();
        assert.typeOf(result,'string')
    });
});
