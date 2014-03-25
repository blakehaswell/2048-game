var describe = require('mocha').describe;
var beforeEach = require('mocha').beforeEach;
var it = require('mocha').it;
var expect = require('chai').expect;
var partial = require('underscore').partial;
var each = require('underscore').each;
var isNumber = require('underscore').isNumber;
var game = require('../index');

describe('makeMove(board, score, move)', function () {

    beforeEach(function () {
        this.validBoard = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
        this.validMove = 'u';
    });

    it('should throw an error if the board is not an array', function () {
        expect(partial(game.makeMove, undefined, this.validMove)).to.throw(Error);
        expect(partial(game.makeMove, 3, this.validMove)).to.throw(Error);
        expect(partial(game.makeMove, 'foo', this.validMove)).to.throw(Error);
        expect(partial(game.makeMove, function () {}, this.validMove)).to.throw(Error);
        expect(partial(game.makeMove, {}, this.validMove)).to.throw(Error);
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
        expect(partial(game.makeMove, fewerBoard, this.validMove)).to.throw(Error);
        expect(partial(game.makeMove, moreBoard, this.validMove)).to.throw(Error);
    });

    it('should throw an error if the board isn’t an array of numbers', function () {
        var notNumberBoard = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 'foo', 0,
            0, 0, 0, 0
        ];
        expect(partial(game.makeMove, notNumberBoard, this.validMove)).to.throw(Error);
    });

    it('should throw an error if the move is not a string', function () {
        expect(partial(game.makeMove, this.validBoard, undefined)).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, 45)).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, {})).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, [])).to.throw(Error);
    });

    it('should throw an error if the move is not a value of “u”, “d”, “l”, or “r”', function () {
        expect(partial(game.makeMove, this.validBoard, 'q')).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, 'foo')).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, 'ud')).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, 'k')).to.throw(Error);
        expect(partial(game.makeMove, this.validBoard, 'e')).to.throw(Error);
    });

    it('should not throw an error if all of the arguments are valid', function () {
        expect(partial(game.makeMove, this.validBoard, this.validMove)).not.to.throw(Error);
    });

    it('should return an array with 16 numbers', function () {
        var board = game.makeMove(this.validBoard, this.validMove);
        expect(board.length).to.equal(16);
        each(board, function (value) {
            expect(isNumber(value)).to.equal(true);
        });
    });

    it('should fold the board values up for an up move', function () {
        var beforeBoard = [
            2, 0, 0, 4,
            0, 8, 0, 0,
            2, 8, 0, 8,
            2, 2, 4, 16
        ];
        var afterBoard = [
            4, 16, 4, 4,
            2, 2, 0, 8,
            0, 0, 0, 16,
            0, 0, 0, 0
        ];
        expect(game.makeMove(beforeBoard, 'u')).to.deep.equal(afterBoard);
    });

    it('should fold the board values down for a down move', function () {
        var beforeBoard = [
            2, 0, 0, 4,
            0, 8, 0, 0,
            2, 8, 0, 8,
            2, 2, 4, 16
        ];
        var afterBoard = [
            0, 0, 0, 0,
            0, 0, 0, 4,
            2, 16, 0, 8,
            4, 2, 4, 16
        ];
        expect(game.makeMove(beforeBoard, 'd')).to.deep.equal(afterBoard);
    });

    it('should fold the board values left for a left move', function () {
        var beforeBoard = [
            2, 0, 0, 4,
            0, 8, 0, 0,
            2, 8, 0, 8,
            2, 2, 4, 16
        ];
        var afterBoard = [
            2, 4, 0, 0,
            8, 0, 0, 0,
            2, 16, 0, 0,
            4, 4, 16, 0
        ];
        expect(game.makeMove(beforeBoard, 'l')).to.deep.equal(afterBoard);
    });

    it('should fold the board values right for a right move', function () {
        var beforeBoard = [
            2, 0, 0, 4,
            0, 8, 0, 0,
            2, 8, 0, 8,
            2, 2, 4, 16
        ];
        var afterBoard = [
            0, 0, 2, 4,
            0, 0, 0, 8,
            0, 0, 2, 16,
            0, 4, 4, 16
        ];
        expect(game.makeMove(beforeBoard, 'r')).to.deep.equal(afterBoard);
    });

});