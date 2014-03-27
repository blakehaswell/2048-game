var describe = require('mocha').describe;
var beforeEach = require('mocha').beforeEach;
var it = require('mocha').it;
var expect = require('chai').expect;
var filter = require('underscore').filter;
var game = require('../index');

describe('initialBoard()', function () {

    beforeEach(function () {
        this.board = game.initialBoard();
    });

    it('should return an array with 16 zeros', function () {
        expect(this.board).to.be.instanceOf(Array);
        expect(this.board.length).to.equal(16);
        var zeros = filter(this.board, function (value) { return 0 === value; });
        expect(zeros.length).to.equal(16);
    });

});