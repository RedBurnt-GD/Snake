/* 
-Missing deaths by border and itself
-Missing growable snake
*/

let map = document.getElementById("map")
let m = map.getContext("2d")

let boardSize = 24

let direction = 0 //WASD = 0123

let position = [[0, 0]]

let time = 200 //time in ms for the snake to move

let snakeSize = 5 //snake's size

let gameStarted = false

map.width = Math.floor(window.innerHeight / boardSize) * boardSize - (boardSize - 2)
map.height = Math.floor(window.innerHeight / boardSize) * boardSize - (boardSize - 2)

position = [[Math.round(boardSize / 2), Math.round(boardSize / 2)]]

document.addEventListener('keydown', manualMovement)
function moveSnake() {
    position.unshift([position[0][0] + ((-2 + direction) % 2), position[0][1] + ((-1 + direction) % 2)])
    if (position.length > snakeSize) {
        position.pop();
    }
    console.log(position)
    redraw()
}

function ateFruit() {
    snakeSize++
    moveSnake()
}

function redraw() {
    m.fillStyle = "#FFFFFF"
    m.fillRect(0, 0, window.innerWidth, window.innerHeight)
    m.fillStyle = "#FF0000"
    for (var x = 0; x <= boardSize + 1; x++) {
        for (var y = 0; y <= boardSize + 1; y++) { 
            m.strokeRect(boardSize * x + 1, boardSize * y + 1, boardSize, boardSize)
        }
    }
    for (var i = 0; i < position.length; i++) {
        m.fillRect(position[i][0] * boardSize + 2, position[i][1] * boardSize + 2, boardSize - 2, boardSize - 2)
    }
}

function manualMovement() {
    if (!gameStarted) {
        setInterval(moveSnake, time)
        gameStarted = true
    }
    switch (event.code) {
        case "KeyW":
        case "ArrowUp":
            if (direction != 2) {
            direction = 0}
            break;
        case "KeyA":
        case "ArrowLeft":
            if (direction != 3) {
            direction = 1}
            break;
        case "KeyS":
        case "ArrowDown":
            if (direction != 0) {
            direction = 2}
            break;
        case "KeyD":
        case "ArrowRight":
            if (direction != 1) {
            direction = 3}
            break;
    }
}

redraw()