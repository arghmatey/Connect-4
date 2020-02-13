let board = [];
let turn;
let winner;

const playerChoices = document.querySelector('#player-choice').querySelectorAll('div');
const gameboardColumns = document.querySelectorAll('column');
const gameBoard = document.querySelector('#board');
const newGame = document.querySelector('#new-game');
const pOneEl = document.querySelector('#player1');
const pTwoEl = document.querySelector('#player2');

const playerInfo = {
    '0': {
        'color': 'var(--page)',
        'id': ''
    },
    '1': {
        'color': 'var(--purple)',
        'id': 'player-one-color',
        'scoreBox': pOneEl
    },
    '-1': {
        'color': 'var(--mustard)',
        'id': 'player-two-color',
        'scoreBox': pTwoEl
    }
}

playerChoices.forEach(function (choice) {
    choice.addEventListener('mouseover', function (evt) {
        event.target.style.backgroundColor = playerInfo[turn]['color'];
    }),
        choice.addEventListener('mouseout', function (evt) {
            event.target.style.backgroundColor = 'transparent';
        }),
        choice.addEventListener('click', clickHandler)
});

newGame.addEventListener('click', init);

init();

function winLogic() {
    for (let v = 0; v < board.length; v++) {
        for (let h = 0; h < board[v].length; h++) {
            if (board[v][h] === turn && board[v][h + 1] === turn && board[v][h + 2] === turn && board[v][h + 3] === turn) {
                winner = turn;
                renderGameStatus();
            } else if (board[v + 1] && board[v + 2] && board[v + 3]) {
                if (board[v][h] === turn && board[v + 1][h] === turn && board[v + 2][h] === turn && board[v + 3][h] === turn) {
                    winner = turn;
                    renderGameStatus();
                }
                if (board[v][h] === turn && board[v + 1][h + 1] === turn && board[v + 2][h + 2] === turn && board[v + 3][h + 3] === turn) {
                    winner = turn;
                    renderGameStatus();
                }
                if (board[v][h] === turn && board[v + 1][h - 1] === turn && board[v + 2][h - 2] === turn && board[v + 3][h - 3] === turn) {
                    winner = turn;
                    renderGameStatus();
                }
            };
        };
    };
}

function clickHandler(evt) {
    let columnNum = parseInt(event.target.getAttribute('class'));
    let slotNum = board[columnNum].lastIndexOf(0);
    if (slotNum === -1) return;
    board[columnNum][slotNum] = turn;
    console.log(board[columnNum][slotNum - 1]);

    winLogic();

    turn *= -1;
    event.target.style.backgroundColor = playerInfo[turn]['color'];
    render();

}

function render() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let holeColor = board[i][j];
            gameBoard.children[i].children[j].style.backgroundColor = playerInfo[holeColor]['color'];
        };
    };
    renderGameStatus();
}

function renderGameStatus() {
    if (winner === null) {
        playerInfo[turn]['scoreBox'].setAttribute('id', playerInfo[turn]['id']);
        playerInfo[turn * -1]['scoreBox'].setAttribute('id', playerInfo['0']['id']);
    } else if (winner === turn) {
        console.log('fuck yeah winner!!!');
    };
}

function init() {
    board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    turn = 1;
    winner = null;
    render();
}