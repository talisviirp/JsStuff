
/*
We store out game status element here to allow us to more easily use it later on
*/
const statusDisplay = document.querySelector('.game--status');
/*
 Here we declare some variables that we will use to track the game state throught the game.
*/
/*
We will use gameActive to pause the game in case of an end scenario  
*/
let gameActive = true;
/*
We will store out current player here, so we know whos turn 
*/
let currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
    will allow us to easily track played cells and validate the game
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
since we have some dynamic factors in thoes messages, namely the current player,
we have declared them as functions, so that the actual message gets created with
current data every time we need it. 
*/
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*
We set the inital message to let the players know whose tur it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
/*   
We update our internal game state to reflect the played move, as well as update the user interface to reflect the played move
*/
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winContition = winningConditions[i];
        let a = gameState[winContition[0]];
        let b = gameState[winContition[1]];
        let c = gameState[winContition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    /*
    We will check weather there are any values in our game state array
    that are still not populated with a player sign
    */
   let roundDraw = !gameState.includes("");
   if (roundDraw) {
       statusDisplay.innerHTML = drawMessage();
       gameActive = false;
       return;
   }
   /*
    If we get to know that no one won the game yet, and that there are still movest to be played,
    we continue by changing the current player.   
   */
   handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
/*
We will save the clicked html element in a variable for easier further use
*/
    const clickedCell = clickedCellEvent.target;
/*
Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid.
Note that the getAttribute will return a string value. In need of number we will parse it to integer.
*/
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
/*
Next up we need to check whether the call has already been played, or if the game is paused. 
If either of thoes is true we will simply ignore the click.
*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
/*
If everything is in order we will proceed with the game flow
*/
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
/*
And finallt we add our event listeners to the actual game cells, as well as our
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);