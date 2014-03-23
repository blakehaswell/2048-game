// TODO: Randomise position of starting square. –BH 2014/03/23
exports.initialBoard = function() {
    var board = [];
    for (var i = 0; i < 16; i++) {
        board[i] = 0;
    }
    board[0] = 2; // Sets starting square.
    return board;
};