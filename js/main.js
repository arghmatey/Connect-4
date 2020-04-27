let board = [];
let turn, winner, score, turnCount;

const playerChoice = document.querySelector('#player-choice').querySelectorAll('div');
const gameboardColumns = document.querySelectorAll('column');
const gameBoard = document.querySelector('#board');
const newBoard = document.querySelector('#new-board');
const messageBox = document.querySelector('#winner');
const pOneEl = document.querySelector('#player1');
const pTwoEl = document.querySelector('#player2');
const pOneScore = document.querySelector('#player1 div');
const pTwoScore = document.querySelector('#player2 div');
const darkBtn = document.querySelector('#toggle-dark');

const playerInfo = {
    '0': {
        'color': 'var(--primary)',
        'id': ''
    },
    '1': {
        'name': 'Purple',
        'color': 'var(--purple)',
        'id': 'player-one-color',
        'scoreBox': pOneEl
    },
    '-1': {
        'name': 'Mustard',
        'color': 'var(--mustard)',
        'id': 'player-two-color',
        'scoreBox': pTwoEl
    }
}

playerChoice.forEach(choice => {
    choice.addEventListener('mouseover', evt => {
        event.target.style.backgroundColor = playerInfo[turn].color;
    }),
        choice.addEventListener('mouseout', evt => {
            event.target.style.backgroundColor = 'transparent';
        }),
        choice.addEventListener('click', clickHandler)
});

newBoard.addEventListener('click', emptyBoard);
darkBtn.addEventListener('click', evt => {
    document.documentElement.style.setProperty('--primary', '#101010')
    document.documentElement.style.setProperty('--text', '#FFFFFF')
})

init();

function init() {
    score = {
        '1': 0,
        '-1': 0
    }
    turn = 1;
    emptyBoard();
}

function emptyBoard() {
    board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    turnCount = 0;
    winner = null;
    render();
}

function clickHandler(evt) {
    if (winner) return;
    let columnNum = parseInt(event.target.getAttribute('class'));
    let slotNum = board[columnNum].lastIndexOf(0);
    if (slotNum === -1) return;
    board[columnNum][slotNum] = turn;
    turnCount += 1;
    winLogic();
    tieLogic();
    renderGameStatus();
    turn *= -1;
    event.target.style.backgroundColor = playerInfo[turn].color;
    render();
}

function render() {
    pOneScore.textContent = score['1'];
    pTwoScore.textContent = score['-1'];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let playerSelect = board[i][j];
            gameBoard.children[i].children[j].style.backgroundColor = playerInfo[playerSelect].color;
        };
    };
    renderGameStatus();
}

function renderGameStatus() {
    if (winner === null) {
        playerInfo[turn]['scoreBox'].setAttribute('id', playerInfo[turn].id);
        playerInfo[turn * -1]['scoreBox'].setAttribute('id', playerInfo['0'].id);
        messageBox.textContent = '';
    } else if (winner === turn) {
        score[winner]++;
        winningMessage();
    } else if (winner === 'tie') {
        messageBox.textContent = 'try again... you tied!';
    };
}

function winningMessage() {
    messageBox.style.color = `${playerInfo[winner].color}`;
    messageBox.textContent = `${playerInfo[winner].name} wins!`
}

function winLogic() {
    for (let c = 0; c < board.length; c++) {
        for (let r = 0; r < board[c].length; r++) {
            if (board[c][r] === turn && board[c][r + 1] === turn && board[c][r + 2] === turn && board[c][r + 3] === turn) {
                winner = turn;
            } else if (board[c + 1] && board[c + 2] && board[c + 3]) {
                if (board[c][r] === turn && board[c + 1][r] === turn && board[c + 2][r] === turn && board[c + 3][r] === turn) {
                    winner = turn;
                }
                if (board[c][r] === turn && board[c + 1][r + 1] === turn && board[c + 2][r + 2] === turn && board[c + 3][r + 3] === turn) {
                    winner = turn;
                }
                if (board[c][r] === turn && board[c + 1][r - 1] === turn && board[c + 2][r - 2] === turn && board[c + 3][r - 3] === turn) {
                    winner = turn;
                }
            }
        };
    };
}

function tieLogic() {
    if (turnCount === 42) {
        winner = 'tie';
    }
}