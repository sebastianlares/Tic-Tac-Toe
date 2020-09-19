
let playerOne = {};
let playerTwo = {};
let gamEnd = false;

const gameBoard = (() => {

    let boardArray = ['', '', '', '', '', '', '', '', ''];
    const board = document.querySelector('.gameBoardContainer');
    const box = () => document.querySelectorAll('.box');
    const marker = () => document.querySelectorAll('.marker');

    let _counter = 0;
    
    _makeBox = () => {
        let box = document.createElement('div');
        let marker = document.createElement('div');
        marker.id = 'marker' + _counter;
        box.id = _counter;
        marker.classList.add('marker');
        box.classList.add('box');
        box.appendChild(marker);
        board.appendChild(box);
        _counter++;
    };

    const _makeBoard = () => {
        boardArray.map((number) => _makeBox());
    };
    _makeBoard();

    const _makeColumns = () => {
        for (let i = 1; i <= 4; i++) {
            let column = document.createElement('div');
            column.classList.add('column' + i);
            board.appendChild(column);
        };
    };
    _makeColumns();

    return {
        box,
        marker,
        boardArray
    };

})();

const gameForm = (() => {

    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        playerOne = _setPlayerOne();
        playerTwo = _setPlayerTwo();
        document.getElementById('play').style.pointerEvents = 'none';
    });

    _setPlayerOne = () => {
        const playerOneInput = document.getElementById('playerOne');
        const playerOneName = playerOneInput.value;
        return playerFactory(playerOneName, 'X', true);
    };

    _setPlayerTwo = () => {
        const playerTwoInput = document.getElementById('playerTwo');
        const playerTwoName = playerTwoInput.value;
        return playerFactory(playerTwoName, 'O', false);
    };

    return {
        formElement
    }
})();

const playerFactory = (name, marker, turn) => {
    return {
        name,
        marker,
        turn
    };
};

const gameLogic = (() => {

    const play = document.getElementById('play');
    const display = document.getElementById('winner');
    const playAgain = document.getElementById('hidden');

    let winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', () => {
        if (gamEnd === true) {
            _resetGame();
        }
        else startGame();
    });

    const startGame = () => {
        gameBoard.box().forEach(box => {
            box.addEventListener('click', () => {
                _setTurnAndPopulateArray(box),
                checkWinner(),
                {once: true}
            });
        });
    };

    const _setTurnAndPopulateArray = (box) => {
        let marker = document.getElementById('marker' + box.id);
        if (playerOne.turn === true) {
            marker.innerText = playerOne.marker;
            gameBoard.boardArray[box.id] = playerOne.marker;
            playerOne.turn = false;
            playerTwo.turn = true;
        }
        else if (playerTwo.turn === true) {
            marker.innerText = playerTwo.marker;
            gameBoard.boardArray[box.id] = playerTwo.marker;
            playerTwo.turn = false;
            playerOne.turn = true;
        }
    };

    const checkWinner = () => {
        winningCombinations.forEach(comb => { 
            const winnerIsX = checkWinnerByValue(comb, 'X');
            const winnerIsO = checkWinnerByValue(comb, 'O');
            if (winnerIsX) { 
                displayWinner(playerOne);
                disableBoard();
                play.style.pointerEvents = 'auto';
                gamEnd = true;
            }
            else if (winnerIsO) {
                displayWinner(playerTwo);
                disableBoard();
                play.style.pointerEvents = 'auto';
                gamEnd = true;
            }
            else if (isDraw(gameBoard.boardArray)) {
                displayWinner('draw');
                play.style.pointerEvents = 'auto';
                gamEnd = true;
            }
        });
    };

    const checkWinnerByValue = (arr, mark) => {
        const isEqual = arr.every((elementIndex) => {
            return gameBoard.boardArray[elementIndex] === mark;
        });
        return isEqual;
    };

    const isDraw = (arr) => {
        const draw = arr.every(index => index !== '');
        return draw;
    }; 

    const displayWinner = (winner) => {
        playAgain.hidden = false;
        display.hidden = false;

        if (winner === 'draw') {
            display.innerText = "It's a draw!";
        }
        else display.innerText = `${winner.name} wins!`;
    };

    const disableBoard  = () => {
        gameBoard.box().forEach(box => {
            box.style.pointerEvents = 'none';
        });
    };

    const _resetGame = () =>  {
        gameBoard.boardArray = ['', '', '', '', '', '', '', '', ''];
        console.log(gameBoard.boardArray);
        gameBoard.marker().forEach(marker => marker.innerText = '');
        gameBoard.box().forEach(box => box.style.pointerEvents = 'auto');
        play.style.pointerEvents = 'auto';
        playAgain.hidden = true;
        display.innerText = '';
    };

})();
