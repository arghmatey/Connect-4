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

playerChoices.forEach(function(choice) {
    choice.addEventListener('mouseover', function(evt) {
        event.target.style.backgroundColor = playerInfo[turn]['color'];
    }),
    choice.addEventListener('mouseout', function(evt) {
        event.target.style.backgroundColor = 'transparent';
    }),
    choice.addEventListener('click', clickHandler)
});

newGame.addEventListener('click', init);

init();

function clickHandler(evt) {
    let choiceNum = parseInt(event.target.getAttribute('class')); // pulls the class name of the div clicked on
    let slotNum = board[choiceNum].lastIndexOf(0); // pulls the index number of the first instance of 0 in the board array chosen
    board[choiceNum][slotNum] = turn; //sets the value of the players choice to the players value in board array
    turn *= -1;
    render();
}

function render(){
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let holeColor = board[i][j];    
            gameBoard.children[i].children[j].style.backgroundColor = playerInfo[holeColor]['color'];
        };
    };
    renderMessage();
}

function renderMessage() {
    if (winner === null) {
        playerInfo[turn]['scoreBox'].setAttribute('id', playerInfo[turn]['id']);
        playerInfo[turn*-1]['scoreBox'].setAttribute('id', playerInfo['0']['id']);
    } else if (winner === 'tie') {
        console.log('wtf a tie?');
    } else {
        console.log('boom win');
    }
}

function init(){
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