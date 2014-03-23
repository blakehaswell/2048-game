var describe = require('mocha').describe;
var beforeEach = require('mocha').beforeEach;
var it = require('mocha').it;
var expect = require('chai').expect;
var each = require('underscore').each;
var filter = require('underscore').filter;
var isNumber = require('underscore').isNumber;
var game = require('../index');

describe('initialBoard()', function () {

    beforeEach(function () {
        this.board = game.initialBoard();
    });

    it('should return an array with 16 numbers', function () {
        expect(this.board.length).to.equal(16);
        each(this.board, function (value) {
            expect(isNumber(value)).to.equal(true);
        });
    });

    it('should return an array with 15 zeros', function () {
        var zeros = filter(this.board, function (value) { return 0 === value; });
        expect(zeros.length).to.equal(15);
    });

    it('should return an array with 1 two', function () {
        var twos = filter(this.board, function (value) { return 2 === value; });
        expect(twos.length).to.equal(1);
    });

});