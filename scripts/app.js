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
let connectedCheckers = 0

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

function generateBoard() {
    for (let idx = 0; idx < totalCheckers; idx++) {
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
    const allCircles = document.querySelectorAll('.circle')     // reset all slots in grid to white to clear the board for a new game
    for (let i = 0; i < allCircles.length; i++) {
        allCircles[i].style.backgroundColor = 'white'
        allCircles[i].style.border = ''
    }
    gameResult.innerHTML = ''                                   // reset game result caption
    const playerTurnDiv = document.querySelector('.players')
    if (playerTurnDiv.children.length >= 2) {                   // remove div that indicates whose turn it is
        const secondChild = playerTurnDiv.children[1]
        playerTurnDiv.removeChild(secondChild)
    }
    getStartingColor()
    boardCircles.forEach(circle => circle.addEventListener('click', selectPosition));
}

function getStartingColor() {
    const startingCircle = document.createElement('div')    // create the div for the player turn in the game state section
    playerTurn.appendChild(startingCircle)
    startingCircle.classList.add('player-turn', 'pulse')
    document.querySelector('.player-turn')
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
        const backgroundColor = window.getComputedStyle(targetCell).backgroundColor
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
    if (checkersNumber > 49) {
        gameResult.innerHTML = `Game is a Draw`.toUpperCase()
        boardCircles.forEach(circle => circle.removeEventListener('click', selectPosition))
    }
}

function checkWinner() {
    if (checkersNumber % 2 === 0) {
        color = evensColor
    }
    else {
        color = oddsColor
    }
    targetCell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`)     // position of last checker played
    let checkWinningColor = targetCell.style.backgroundColor    // color of last checker played
    
    let winningArray = []
    let connectedCheckers = 0
    for (let i = 0; i < columnArray.length; i++) {
        if (columnArray[i].style.backgroundColor === checkWinningColor) {
            connectedCheckers++
            winningArray.push(columnArray[i])
        } else {
            connectedCheckers = 0
        }
        if (connectedCheckers >= 4) {
            winningArray.forEach(circle => circle.style.border = '6px solid goldenrod')
            checkFourInARow(connectedCheckers, checkWinningColor)
        }
    }

    let targetCellRow = targetCell.dataset.row
    rowArray = Array.from(boardCircles).filter(div => div.dataset.row === targetCellRow)

    winningArray = []
    connectedCheckers = 0
    for (let i = 0; i < rowArray.length; i++) {
        if (rowArray[i].style.backgroundColor === checkWinningColor) {
            connectedCheckers++
            winningArray.push(rowArray[i])
        } else {
            connectedCheckers = 0
        }
        if (connectedCheckers >= 4) {
            winningArray.forEach(circle => circle.style.border = '6px solid goldenrod')
            checkFourInARow(connectedCheckers, checkWinningColor)
        }
    }

    if (checkersNumber > 10) {                              // check for diagonal winners
        diagonalArray1 = [0, 8, 16, 24, 32, 40, 48]         // indexes of all diagonals as arrays
        diagonalArray2 = [7, 15, 23, 31, 39, 47]
        diagonalArray3 = [14, 22, 30, 38, 46]
        diagonalArray4 = [21, 29, 37, 45]
        diagonalArray5 = [1, 9, 17, 25, 33, 41]
        diagonalArray6 = [2, 10, 18, 26, 34]
        diagonalArray7 = [3, 11, 19, 27]
        diagonalArray8 = [6, 12, 18, 24, 30, 36, 42]
        diagonalArray9 = [5, 11, 17, 23, 29, 35]
        diagonalArray10 = [4, 10, 16, 22, 28]
        diagonalArray11 = [3, 9, 15, 21]
        diagonalArray12 = [13, 19, 25, 31, 37, 43]
        diagonalArray13 = [20, 26, 32, 38, 44]
        diagonalArray14 = [27, 33, 39, 45]
        
        allDiagonalArray = [diagonalArray1, diagonalArray2, diagonalArray3, diagonalArray4, diagonalArray5, diagonalArray6, diagonalArray7, diagonalArray8, diagonalArray9, diagonalArray10, diagonalArray11, diagonalArray12, diagonalArray13, diagonalArray14]

        const targetCellIndex = Number(targetCell.dataset.index)        // index of last checker
        const matchingArrays = allDiagonalArray.filter(innerArray => innerArray.includes(targetCellIndex)) // check for matching arrays for index value of target cell
        
        let firstDiagonalArray = []     // first diagonal containing matching index value
        let secondDiagonalArray = []    // second diagonal containing matching index value for overlapping diagonals

        firstDiagonalArray = matchingArrays[0]
        secondDiagonalArray = matchingArrays[1]
      
        diagonalArrays(firstDiagonalArray, secondDiagonalArray, checkWinningColor)        
    }
}

function diagonalArrays(firstDiagonalArray, secondDiagonalArray, checkWinningColor) {
    let connectedCheckers = 0
    const boardCircles = document.querySelectorAll(".circle")  
    diagonalArray = Array.from(boardCircles).filter((_, index) => firstDiagonalArray.includes(index)) // filter array based on target cell index and array of cells in that diagonal
    
    winningArray = []
    connectedCheckers = 0
    for (let i = 0; i < diagonalArray.length; i++) {       // check for matching colors in the array
        if (diagonalArray[i].style.backgroundColor === checkWinningColor) {
            connectedCheckers++
            winningArray.push(diagonalArray[i])
        } else {
            connectedCheckers = 0
        }
        if (connectedCheckers >= 4) {
            winningArray.forEach(circle => circle.style.border = '6px solid goldenrod')
            checkFourInARow(connectedCheckers, checkWinningColor)
        }
    }

    if (secondDiagonalArray && secondDiagonalArray.length > 0 && connectedCheckers < 4) { // filter on second diagonal array for when cell belongs to overlapping diagonals
        connectedCheckers = 0
        diagonalArray = Array.from(boardCircles).filter((_, index) => secondDiagonalArray.includes(index))
        
        winningArray = []
        connectedCheckers = 0
        for (let i = 0; i < diagonalArray.length; i++) {
            if (diagonalArray[i].style.backgroundColor === checkWinningColor) {
                connectedCheckers++
                winningArray.push(diagonalArray[i])
            } else {
                connectedCheckers = 0
            }
            if (connectedCheckers >= 4) {
                winningArray.forEach(circle => circle.style.border = '6px solid goldenrod')
                checkFourInARow(connectedCheckers, checkWinningColor)
            }
        }
    }
} 

function checkFourInARow(connectedCheckers, checkWinningColor) {
    if (connectedCheckers === 4) {
        boardCircles.forEach(circle => circle.removeEventListener('click', selectPosition))
        gameResult.innerHTML = `${checkWinningColor} Wins`.toUpperCase()    // declare result in caption above board
        gameResult.style.color = checkWinningColor                          // add winning color to result test
        if (checkWinningColor === 'red') {      // update scoreboard
            redWins++
            redScore.innerHTML = `${checkWinningColor.charAt(0).toUpperCase()}${checkWinningColor.slice(1).toLowerCase()} = ${redWins}`
        } else {
            yellowWins++
            yellowScore.innerHTML = `${checkWinningColor.charAt(0).toUpperCase()}${checkWinningColor.slice(1).toLowerCase()} = ${yellowWins}`
        }
    }
}

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