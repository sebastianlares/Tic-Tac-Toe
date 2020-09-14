const gameBoard = (() => {

    let boardArray = ['1', '2', '3', '4', '5', '6', ' 7', ' 8', '9'];
    const _board = document.querySelector('.gameBoardContainer');
    const box = () => document.querySelectorAll('.box');

    let counter = 0;
    
    _makeBox = () => {
        let box = document.createElement('div');
        box.id = counter;
        box.classList.add('box');
        _board.appendChild(box);
        counter++;
    }

    function makeBoard () {
        boardArray.map(number => _makeBox());
    }
    makeBoard();

    const _makeColumns = () => {
        for (let i = 1; i <= 4; i++) {
            let column = document.createElement('div');
            column.classList.add('column' + i);
            _board.appendChild(column);
        }
    }
    _makeColumns();

    return {box, boardArray};

})();

gameBoard.box().forEach(box => {
    box.addEventListener('click', () => {
        console.log('ds');
    })
})

const setPlayersName = (() => {

    let firstPlayerName;
    let secondPlayerName;

    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        new FormData(formElement);
    });

    const playerOne = () => firstPlayerName;

    const playerTwo = () => secondPlayerName;

    function playerOneName () {
        formElement.addEventListener('formdata', (e) => {
            let formData = e.formData;
            firstPlayerName = formData.get('playerOne');
        });
    }
    playerOneName();
   
    // a completar next: ai choice if playertwo no fue seleccionado
    // checkfields = () => {
    //     let aiButton = document.getElementById('aiButton').checked;
    //     if (secondPlayerName === undefined && aiButton === true) {
    //         console.log('no');
    //     }
    // }

    function playerTwoName () {
        formElement.addEventListener('formdata', (e) => {
            let formData = e.formData;
            secondPlayerName = formData.get('playerTwo');
        });

        // const playButton = document.getElementById('play');
        // playButton.addEventListener('click', checkfields);
        
    }
    playerTwoName();

    return {playerOne, playerTwo};

})();

console.log(setPlayersName.playerOne(), setPlayersName.playerTwo());

const playerFactory = (name, marker) => {

    
   return {name, marker};
}

const playerOne = playerFactory(setPlayersName.playerOne(), 'x');

console.log(playerOne.marker);

console.log(playerOne.name);

