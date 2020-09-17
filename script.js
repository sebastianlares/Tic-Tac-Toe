
let playerOne = {};
let playerTwo = {};

const gameBoard = (() => {

    let boardArray = [' ', ' ', ' ', ' ', ' ', ' ', '  ', '  ', ' '];
    const _board = document.querySelector('.gameBoardContainer');
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
        _board.appendChild(box);
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
            _board.appendChild(column);
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
        console.log(playerOne, playerTwo);
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
})();

const playerFactory = (name, marker, turn) => {
    return {
        name,
        marker,
        turn
    };
};

const gameLogic = (() => {

    let winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [2, 4, 7],
        [3, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const playButton = document.getElementById('play');
    playButton.addEventListener('click', () => {
        _resetGame();
        startGame();
    });

    const startGame = () => {
        gameBoard.box().forEach(box => {
            box.addEventListener('click', () => {
                let marker = document.getElementById('marker' + box.id);
                _setTurnAndPopulateArray(marker, box);
                checkWinner();
            }, {once: true});
        });
    };

    const _setTurnAndPopulateArray = (marker, box) => {

            if (playerOne.turn == true) {
                marker.innerText = playerOne.marker;
                gameBoard.boardArray[box.id] = playerOne.marker;
                playerOne.turn = false;
                playerTwo.turn = true;
            }
            else if (playerTwo.turn == true) {
                marker.innerText = playerTwo.marker;
                gameBoard.boardArray[box.id] = playerTwo.marker;
                playerTwo.turn = false;
                playerOne.turn = true;
            }
    };

    const checkWinner = () => {

        winningCombinations.forEach(comb => {
            const sequence = [gameBoard.boardArray[comb[0]],gameBoard.boardArray[comb[1]], gameBoard.boardArray[comb[2]]];

            if (allSame(sequence)) {
                console.log('winner');
            }
        });
    };


    // No logro setear el marker para que sea X u O, me elige siempre la X, por mas que ponga como marker la 'O'. Creo que el problema esta en que el gameBoard.boardArray tomo solo la X como el marker
    const allSame = (arr) => arr.every(marker => marker === 'X');

    const _resetGame = () => {

    };

})();
