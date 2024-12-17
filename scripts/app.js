/*-------------------------------- Pseudocode --------------------------------*/

// > Add a click event for every div in the grid - use ForEach method
// > Create a function named startGame that will be triggered by the start button
    // create a function that randomly selects red/yellow to start the game
        // colorChoice = [red, yellow]
// > Create a function selectedColumn that will identify the column using the column attribute
    // use event target method to obtain column data attribute
// > Create a function that works out the position of the counter based on selectedColumn
    // use event target to obtain row data attribute
    // iterate through to see if div is empty, starting with row 7
// > create a turn function that works out which turn it is, yellow/red
    // use modulas to check if even/odd
// > Create a function that changes the class of div to red/yellow based on which turn it is
// > Create a function called checkWinner that works out if there are four in a row of red/yellow checkers
    // this function is to be called after every play
    // call scoreboard function if winner declared
// > create a scoreboard function that updates the score and declares a winner
// > if the board is full, usedCheckers = 49, declare the game a draw
// > click the startButton to start a new game
    // ensure all the divs are empty at the start of a new game

/*----------------------------------- HTML------------------------------------*/

// > create game board using flex method
// > create start game button and a div for game result caption
// > create game container div with display flex
    // grid container div and game state div
        // in code genereate 49 divs, 7 by 7, assigning data attributes: index, column, row
        // create two child divs for the game state div
            // players div and scoreboard div

/*-------------------------------- Constants --------------------------------*/

// grid container
// total number of checkers
// color of checkers
const gridRows = 7
const gridColumns = 7
const totalCheckers = gridRows * gridColumns
const gridCells = []
const colorChoice = ['red', 'yellow']

/*-------------------------------- Variables --------------------------------*/

// starting color
// create a variable to track the red score - global
// create a variable to track the yellow score - global
// number of checkers used

let startingColor = ''
let columnArray = ''
let targetCell = ''
let checkersNumber = 1
let oddsColor = ''
let evensColor = ''
let startingCircle = ''
let redWins = 0
let yellowWins = 0

/*------------------------ Cached Element References ------------------------*/

// cache the div elements - "divs" - use a querySelectAll
// cache the start button
// cache the red score element
// cache the yellow score element
// cache the winner element

const startButton = document.querySelector('#start-game')
const gridContainer = document.querySelector('.grid')
const redScore = document.querySelector('#red-score')
const yellowScore = document.querySelector('#yellow-score')
const gameResult = document.querySelector(".game-result")
const playerTurn = document.querySelector(".players")

/*-------------------------------- Functions --------------------------------*/

// startGame function
// generateBoard function
// startingColor function
// selectedColumn function
// selectPosition function
// colorTurn function
// setColour function
// checkWinner function
// scoreboard function

/*----------------------------- Event Listeners -----------------------------*/

//add an event listener for the start button
//add an event listener for each div using ForEach method

// On Page Load
generateBoard()
const boardCircles = document.querySelectorAll(".circle")

function generateBoard(){
    for(let idx = 0; idx < totalCheckers; idx++){
      const cell = document.createElement('div')        // create the cells for the gird
      const circle = document.createElement('div')      // create the checker slot that sits inside each cell
      cell.classList.add('cell')                        // add style to the cell
      circle.classList.add('circle')                    // add and manipulate color of circle "slot"
      circle.dataset.index = idx
      circle.dataset.row = Math.floor(idx / 7) + 1;     // add column as a dataset value to help target cell and obtain postion on grid
      circle.dataset.column = (idx % 7) + 1;            // add row as a dataset value to help target celt and obtain position on grid
      cell.style.width = `${100 / gridColumns}%`
      cell.style.height = `${100 / gridRows}%`
      gridContainer.appendChild(cell).appendChild(circle)
      gridCells.push(cell)                              // generate board
      const circles = document.querySelectorAll(".circle")
    }
}

function startGame() {
    checkersNumber = 1                              
    const allCircles = document.querySelectorAll('.circle');    // reset all slots in grid to white to clear the board for a new game
    for (let i = 0; i < allCircles.length; i++) {
        allCircles[i].style.backgroundColor = 'white';
    }
    gameResult.innerHTML = ''                                   // reset game result caption
    const playerTurnDiv = document.querySelector('.players')
    if (playerTurnDiv.children.length >= 2) {                   // remove div that indicates whose turn it is
        const secondChild = playerTurnDiv.children[1]
        playerTurnDiv.removeChild(secondChild)
    }
    getStartingColor()
}

function getStartingColor() {
    const startingCircle = document.createElement('div')    // create the div for the player turn in the game state section
    playerTurn.appendChild(startingCircle)
    startingCircle.classList.add('player-turn')
    const randomIdx = Math.floor(Math.random() * colorChoice.length)
    startingColor = colorChoice[randomIdx]                  // randomise the starting color
    startingCircle.style.backgroundColor = startingColor    // add starting color to the player turn checker
    const startingColorIdx = colorChoice.indexOf(startingColor)
    if (startingColorIdx % 2 === 0) {                       // which color will be dropped when turn is odd versus even
        evensColor = 'red'
        oddsColor = 'yellow'
    }
    else {
        evensColor = 'yellow'
        oddsColor = 'red'
    }
}

function selectPosition(event) {
    checkersNumber += 1                                 // increment number of checkers used with each click
    if (checkersNumber % 2 === 0) {                     // check if odd or even turn
        turn = 'Evens'
    }
    else {
        turn = 'Odds'
    }
    column = event.target.dataset.column                // obtain column that has been clicked on
    columnArray = Array.from(boardCircles).filter(div => div.dataset.column === column) // grab all the slots in that column as an array
    for (let idx = columnArray.length; idx >= 0; idx--) {       // iterate through the divs in the selected column
        row = idx
        const targetCell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`) // select target cell to drop checker into
        const backgroundColor = window.getComputedStyle(targetCell).backgroundColor;
        if (backgroundColor === 'rgb(255, 255, 255)') {         // check if color of cell is white (empty)
            startingCircle = document.querySelector('.player-turn')
            if (turn === 'Evens') {                             // check if even or odd turn and set color of the cell
                targetCell.style.backgroundColor = evensColor
                startingCircle.style.backgroundColor = oddsColor // update starting circle color to indicate the other player's turn
            } else {
                targetCell.style.backgroundColor = oddsColor
                startingCircle.style.backgroundColor = evensColor
            }
            break;              // if slot found for the checker break out of loop, otherwise loop round to test the row above (minus 1)
        }
    }
    if (checkersNumber > 7) {
        checkWinner()
    }
}

function checkWinner() {
    let connectedCheckers = 0
    if (checkersNumber % 2 === 0) {
        color = evensColor
    }
    else {
        color = oddsColor
    }
    targetCell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`) // position of last checker played
    let checkWinningColor = targetCell.style.backgroundColor    // color of last checker played
    if (row <= 4 ) {                                // check if there are 4 in a row vertically
        for (let currentRow = row; currentRow < 8; currentRow++) {      // loop to check if next checker below is the same color
            adjacentCell = document.querySelector(`[data-row="${currentRow}"][data-column="${column}"]`) 
            let adjacentColor = adjacentCell.style.backgroundColor
            if (checkWinningColor === adjacentColor) {
                connectedCheckers ++                    // if same color add 1 to connected checkers
            } 
            else {                          // if not the same color reset connected checkers and loop round to check the next one 
                connectedCheckers = 0
            }
            if (connectedCheckers === 4) {
                gameResult.innerHTML = `${checkWinningColor} Wins`.toUpperCase() // declare the game winner
                gameResult.style.color = checkWinningColor          // update color of game winner text
                if (checkWinningColor === 'red') {          // update scoreboard 
                    redWins = Number(redWins + 1)
                    redScore.innerHTML = `${checkWinningColor.charAt(0).toUpperCase()}${checkWinningColor.slice(1).toLowerCase()} = ${redWins}`
                } else {
                    yellowWins = Number(yellowWins + 1)
                    yellowScore.innerHTML = `${checkWinningColor.charAt(0).toUpperCase()}${checkWinningColor.slice(1).toLowerCase()} = ${yellowWins}`
                }
            }
        }
        
    }
    if (column >= 4 ) {     // check if there are four in a row horizontally
        for (let currentColumn = column; currentColumn >= column - 4 && currentColumn >= 1; currentColumn--) {
            adjacentCell = document.querySelector(`[data-row="${row}"][data-column="${currentColumn}"]`)
            let adjacentColor = adjacentCell.style.backgroundColor
            if (checkWinningColor === adjacentColor) {
                connectedCheckers ++
            } 
            else {
                connectedCheckers = 0
            }
            if (connectedCheckers === 4) {
                gameResult.innerHTML = `${checkWinningColor} Wins`.toUpperCase()
                gameResult.style.color = checkWinningColor
                if (checkWinningColor === 'red') {
                    redWins = Number(redWins + 1)
                    redScore.innerHTML = `${checkWinningColor.charAt(0).toUpperCase()}${checkWinningColor.slice(1).toLowerCase()} = ${redWins}`
                } else {
                    yellowWins = Number(yellowWins + 1)
                    yellowScore.innerHTML = `${checkWinningColor.charAt(0).toUpperCase()}${checkWinningColor.slice(1).toLowerCase()} = ${yellowWins}`
                }
            }
        }   
    }
}

boardCircles.forEach(circle => circle.addEventListener('click', selectPosition));

startButton.addEventListener('click', startGame);

/*-------------------------------- Game Rules -------------------------------*/

// #### The game should take place on a 7 by 7 grid of cells, centered on the screen
// #### A start button should start the game...

// * Player vs Player game 

// ### When the game starts:

// * Players take turns dropping one checker at a time into an empty column from the top of the grid. The checker will fall to the bottom of the column.
// * The first player to get four checkers in a row wins. The row can be horizontal, vertical, or diagonal. 
// * If the board fills up before a player gets four in a row, the game is a draw.

// **Extension**
// * Add a time element to the game
// * Players have a time limit for each turn