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

function startGame() {
    getStartingColor()
}

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

function getStartingColor() {
    const startingCircle = document.createElement('div')    // create the div for the player turn in the game state section
    playerTurn.appendChild(startingCircle)
    startingCircle.classList.add('player-turn')
    const randomIdx = Math.floor(Math.random() * colorChoice.length)
    startingColor = colorChoice[randomIdx]                  // randomise the starting color
    startingCircle.style.backgroundColor = startingColor    // add starting color to the player turn checker
    const startingColorIdx = colorChoice.indexOf(startingColor)
    if (startingColorIdx % 2 === 0) {                       // which color will be dropped when number is odd versus even
        evensColor = 'red'
        oddsColor = 'yellow'
    }
    else {
        evensColor = 'yellow'
        oddsColor = 'red'
    }
}

function selectPosition(event) {
    checkersNumber += 1
    if (checkersNumber % 2 === 0) {
        turn = 'Evens'
    }
    else {
        turn = 'Odds'
    }
    column = event.target.dataset.column
    columnArray = Array.from(boardCircles).filter(div => div.dataset.column === column)
    for (let idx = columnArray.length; idx >= 0; idx--) {
        row = idx
        const targetCell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`)
        const backgroundColor = window.getComputedStyle(targetCell).backgroundColor;
        if (backgroundColor === 'rgb(255, 255, 255)') {
            startingCircle = document.querySelector('.player-turn')
            if (turn === 'Evens') {
                targetCell.style.backgroundColor = evensColor
                startingCircle.style.backgroundColor = oddsColor
            } else {
                targetCell.style.backgroundColor = oddsColor
                startingCircle.style.backgroundColor = evensColor
            }
            break;
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