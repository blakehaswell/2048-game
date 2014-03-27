var assert = require('chai').assert;
var each = require('underscore').each; // TODO: Replace with native .each()
var flatten = require('underscore').flatten;
var zip = require('underscore').zip;
var partial = require('underscore').partial;
var compose = require('underscore').compose;

exports.initialBoard = function () {
    var board = [];
    for (var i = 0; i < 16; i++) board[i] = 0;
    return board;
};

exports.makeMove = function (board, move) {
    assertValidBoard(board);
    assertValidMove(move);
    switch(move) {
        case 'u':
            return fold(board, true, false);
        case 'd':
            return fold(board, true, true);
        case 'l':
            return fold(board, false, false);
        case 'r':
            return fold(board, false, true);
    }
};

function assertValidBoard(board) {
    assert.isArray(board);
    assert.lengthOf(board, 16);
    each(board, assert.isNumber);
}

function assertValidMove(move) {
    assert.isString(move);
    assert.include(['u', 'd', 'l', 'r'], move);
}

function fold(board, vertical, inverted) {
    var boardArray = vertical ? boardAsColumns(board) : boardAsRows(board);
    var doShift = partial(shiftValues, inverted);
    var doFold = partial(foldValues, inverted);
    var newBoardArray = compose(doShift, doFold, doShift)(boardArray);
    if (vertical) newBoardArray = zip.apply(undefined, newBoardArray);
    return flatten(newBoardArray);
}

function boardAsColumns(board) {
    return zip.apply(undefined, boardAsRows(board));
}

function boardAsRows(board) {
    return board.reduce(function (rowsArray, value, index) {
        var row = Math.floor(index / 4);
        var column = index % 4;
        if (!rowsArray[row]) rowsArray[row] = [];
        rowsArray[row][column] = value;
        return rowsArray;
    }, []);
}

function shiftValues(inverted, boardArray) {
    return boardArray.map(function (values) {
        for (var i = 0; i < 4; i++) {
            var x = inverted ? 3 - i : i;
            if (values[x] === 0) {
                for (var j = i; j < 4; j++) {
                    var y = inverted ? 3 - j : j;
                    if (values[y] !== 0) {
                        values[x] = values[y];
                        values[y] = 0;
                        break;
                    }
                }
            }
        }
        return values;
    });
}

function foldValues(inverted, boardArray) {
    return boardArray.map(function (rows) {
        for (var i = 1; i < 4; i++) {
            var x = inverted ? 3 - i : i;
            var y = inverted ? x + 1 : x - 1;
            if (rows[x] === rows[y]) {
                rows[y] = rows[x] * 2;
                rows[x] = 0;
            }
        }
        return rows;
    });
}