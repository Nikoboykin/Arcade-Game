const cells = document.querySelectorAll(".cell");
const turnStatus = document.querySelector("#turnStatus");
const currentPlayerName = document.querySelector("#player1");
const restartBttn = document.querySelector("#restartBttn");
const winConditions = [
    
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
];
let options = ["","","","","","","","",""];
let currentPlayer = "X" ;
let running = false;

initializeGame();

function initializeGame(){

    cells.forEach(cell => cell.addEventListener("click",cellClicked));

    restartBttn.addEventListener("click",restartGame);

    turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);
    running = true;
}
function cellClicked(){
    let cellIdx = this.getAttribute("cellIdx");

    if(options[cellIdx] != "" || !running){
        return;
    }
    updateCell(this, cellIdx);
    checkForWinner();
}
function updateCell(cell, idx){
    options[idx] = currentPlayer;
    cell.textContent = currentPlayer;
}
function switchPlayer(){
    currentPlayer = (currentPlayer == "X")? "O": "X";
    turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);
}
function checkForWinner(){
    let roundWon = false; 

    for(let i = 0; i < winConditions.length; i++){
        let condition = winConditions[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        turnStatus.textContent = (`${currentPlayer} Wins!`);
        running = false;
    }
    else if(!options.includes("")){
        turnStatus.textContent = 'Wash!';
        running = false;
    }
    else{
        switchPlayer();
    }
}
function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""];
    turnStatus.textContent = (`${currentPlayer} Choose Your Space!`);
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
