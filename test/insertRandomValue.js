var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var filter = require('underscore').filter;
var partial = require('underscore').partial;
var game = require('../index');

describe('insertRandomValue(board)', function () {

    it('should throw an error if the board is not an array', function () {
        expect(partial(game.insertRandomValue, undefined)).to.throw(Error);
        expect(partial(game.insertRandomValue, 3)).to.throw(Error);
        expect(partial(game.insertRandomValue, 'foo')).to.throw(Error);
        expect(partial(game.insertRandomValue, function () {})).to.throw(Error);
        expect(partial(game.insertRandomValue, {})).to.throw(Error);
    });

    it('should throw an error if the board has fewer or more than 16 values', function () {
        var fewerBoard = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0
        ];
        var moreBoard = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        expect(partial(game.insertRandomValue, fewerBoard)).to.throw(Error);
        expect(partial(game.insertRandomValue, moreBoard)).to.throw(Error);
    });

    it('should throw an error if the board isn’t an array of numbers', function () {
        var notNumberBoard = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 'foo', 0,
            0, 0, 0, 0
        ];
        expect(partial(game.insertRandomValue, notNumberBoard)).to.throw(Error);
    });

    it('should throw an error if the board doesn’t have any zeros', function () {
        var noZerosBoard = [
            2, 2, 2, 2,
            2, 2, 2, 2,
            2, 2, 2, 2,
            2, 2, 2, 2
        ];
        expect(partial(game.insertRandomValue, noZerosBoard)).to.throw(Error);
    });

    it('should not throw an error if all of the arguments are valid', function () {
        var validBoard = [
            2, 2, 2, 2,
            2, 2, 0, 2,
            2, 2, 2, 2,
            2, 2, 2, 2
        ];
        expect(partial(game.insertRandomValue, validBoard)).not.to.throw(Error);
    });

    it('should return a copy of the board with a random 0 replaced by a 2', function () {
        var board1 = [
            2, 2, 2, 2,
            2, 2, 0, 2,
            2, 2, 2, 2,
            2, 2, 2, 2
        ];
        var board2 = [
            2, 8, 2, 2,
            2, 2, 0, 4,
            2, 0, 0, 4,
            2, 2, 4, 8
        ];
        expect(game.insertRandomValue(board1)).to.deep.equal([
            2, 2, 2, 2,
            2, 2, 2, 2,
            2, 2, 2, 2,
            2, 2, 2, 2
        ]);
        var zeros = filter(game.insertRandomValue(board2), function (value) { return 0 === value; });
        var twos = filter(game.insertRandomValue(board2), function (value) { return 2 === value; });
        expect(zeros.length).to.equal(2);
        expect(twos.length).to.equal(9);
    });

});