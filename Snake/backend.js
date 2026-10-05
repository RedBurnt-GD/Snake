/* 
-Missing deaths by border and itself
-Missing growable snake
*/

let dead = false

let map = document.getElementById("map")
let m = map.getContext("2d")

let boardSize = 24
let direction = 5 //WASD = 0123; 5 to not allow the game to start
var lastDirection = 5
let position = [[0, 0]]

let fruits = []
let fruitCap = 8

let fruitTime = 3000
let time = (1000/7) //time in ms for the snake to move

let snakeSize = 5 //snake's size

let gameStarted = false

let timeInterval;

let fruitX;
let fruitY;

let visibleQuadrille = false

map.width = Math.floor(window.innerHeight / boardSize) * boardSize - (boardSize - 2)
map.height = Math.floor(window.innerHeight / boardSize) * boardSize - (boardSize - 2)

position = [[Math.round(boardSize / 2), Math.round(boardSize / 2)]]

document.addEventListener('keydown', manualMovement)

function moveSnake() {
    lastDirection = direction
    console.log("H.W")
    position.unshift([position[0][0] + ((-2 + direction) % 2), position[0][1] + ((-1 + direction) % 2)])
    if (position.length > snakeSize) {
        position.pop();
    }
    checkDeath()
    checkFruit()
    redraw()
}

function makeFruit() {
    fruitX = Math.floor(Math.random() * boardSize) 
    fruitY = Math.floor(Math.random() * boardSize)

    for (let i = 0; i < position.length; i++) {
        if (fruitX == position[i][0] && fruitY == position[i][1]) {
            makeFruit()
        }
    }
    if (fruits.length < fruitCap) {
        fruits.unshift([fruitX, fruitY])
    }
}

function redraw() {
    m.fillStyle = "#ADB604"
    m.fillRect(0, 0, window.innerWidth, window.innerHeight)

    if (visibleQuadrille) {
        for (var x = 0; x <= boardSize + 1; x++) {
            for (var y = 0; y <= boardSize + 1; y++) { 
                m.strokeRect(boardSize * x + 1, boardSize * y + 1, boardSize, boardSize)
            }
        }
    }
    //Auxiliary outer border
    m.strokeRect(1, 1, boardSize * (boardSize + 1), boardSize * (boardSize + 1))

    for (var i = 0; i < position.length; i++) {
        if (dead == true) {
           m.fillStyle = "#A9A9A9"
        }
        else if (i == 0) {
            m.fillStyle = "#00FF00"
        }
        else {
            m.fillStyle = "#0000FF"
        }
        m.fillRect(position[i][0] * boardSize + 2, position[i][1] * boardSize + 2, boardSize - 2, boardSize - 2)
    }

    m.fillStyle = "#FF0000"
    for (var i = 0; i < fruits.length; i++) {
        m.fillRect(fruits[i][0] * boardSize + 2, fruits[i][1] * boardSize + 2, boardSize - 2, boardSize - 2)
    }
}

function manualMovement() {
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            if (lastDirection != 2) {
            direction = 0}
            break;
        case "KeyA":
        case "ArrowLeft":
            if (lastDirection != 3) {
            direction = 1}
            break;
        case "KeyS":
        case "ArrowDown":
            if (lastDirection != 0) {
            direction = 2}
            break;
        case "KeyD":
        case "ArrowRight":
            if (lastDirection != 1) {
            direction = 3}
            break;
    }
    if ((Math.floor(direction / 4) == 0) && !gameStarted) {
        timeInterval = setInterval(moveSnake, time)
        fruitInterval = setInterval(makeFruit, fruitTime)
        gameStarted = true
    }
}

function checkDeath() {
    for (let j = 0; j < position.length; j++) {
        for (let i = (1 + j); i < position.length; i++) {
            if (position[j][0] == position[i][0] && position[j][1] == position[i][1]) {
                death()
            }
        }
        if (position[j][0] >= boardSize || position[j][1] >= boardSize) {
            death()
        }
        if (position[j][0] < 0 || position[j][1] < 0) {
            death()
        }
    }   

}

function checkFruit() {
    for (let i = 0; i < fruits.length; i++) {
        if (fruits[i][0] == position[i][0] && fruits[i][1] == position[i][1]) {
            snakeSize++
            fruits.splice(i, 1)
            redraw()
            break;
        }
    }
}

function death() {
    dead = true
    console.log("Death")
    clearInterval(timeInterval)
    clearInterval(fruitInterval)
    redraw()
}

redraw()