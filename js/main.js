let board = [];
let turn, winner, score, turnCount;

const playerChoice = document.querySelector('#player-choice').querySelectorAll('div');
const gameboardColumns = document.querySelectorAll('column');
const gameBoard = document.querySelector('#board');
const newBoard = document.querySelector('#new-board');
const messageBox = document.querySelector('#winner');
const pOneEl = document.querySelector('#player1-name');
const pTwoEl = document.querySelector('#player2-name');
const pOneScore = document.querySelector('#player1 div');
const pTwoScore = document.querySelector('#player2 div');
const darkBtn = document.querySelector('#toggle-dark');
const themeSelect = document.querySelector('#theme-select');

const playerInfo = {
    '0': {
        'color': 'var(--primary)',
        'id': ''
    },
    '1': {
        'name': 'Player 1',
        'color': 'var(--player1)',
        'id': 'player-one-color',
        'scoreBox': pOneEl
    },
    '-1': {
        'name': 'Player 2',
        'color': 'var(--player2)',
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

// 
themeSelect.addEventListener('change', evt => {
    if (event.target.value === 'Default') {
        document.documentElement.style.setProperty('--primary', 'var(--def1)')
        document.documentElement.style.setProperty('--text', 'var(--def2)')
        document.documentElement.style.setProperty('--player1', 'var(--def3)')
        document.documentElement.style.setProperty('--player2', 'var(--def4)')
        document.documentElement.style.setProperty('--board', 'var(--def5)')
    } else if (event.target.value === 'Dark') {
        document.documentElement.style.setProperty('--primary', 'var(--dark1)')
        document.documentElement.style.setProperty('--text', 'var(--dark2)')
        document.documentElement.style.setProperty('--player1', 'var(--dark3)')
        document.documentElement.style.setProperty('--player2', 'var(--dark4)')
        document.documentElement.style.setProperty('--board', 'var(--dark5)')
    } else if (event.target.value === 'Sherbert') {
        document.documentElement.style.setProperty('--primary', 'var(--sher1)')
        document.documentElement.style.setProperty('--text', 'var(--sher2)')
        document.documentElement.style.setProperty('--player1', 'var(--sher3)')
        document.documentElement.style.setProperty('--player2', 'var(--sher4)')
        document.documentElement.style.setProperty('--board', 'var(--sher5)')
    }
})

init();

function init() {
    score = {
        '1': 0,
        '-1': 0
    }
    turn = 1;
    buildBoard();
}

function buildBoard() {
    for (let i = 0; i <= 6; i++) {
        var column = document.createElement('div');
        column.className = 'column';
        column.id = `col${i}`;
        gameBoard.appendChild(column);
        for (let i = 0; i < 6; i++) {
            var hole = document.createElement('div');
            hole.class = 'hole';
            column.appendChild(hole);
        }
    }
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
    event.target.style.backgroundColor = 'transparent';
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