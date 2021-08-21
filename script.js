//Game board will be 20x20
//This means every step will be 40 pixels
const boardSize = 20;
const step = 40
let isGameOver = false;

//definitions
let defaultSnake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0],
    apple: [11, 8]
}
let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0],
    apple: [11, 8]
}

function move() {
    const newSeg = [snake.body[snake.body.length-1][0] + snake.nextDirection[0], snake.body[snake.body.length-1][1] + snake.nextDirection[1]];
    snake.body.push(newSeg);
    if(snake.body[snake.body.length-1] !== snake.apple) {
        snake.body.splice(0, 1);
    } else {
        apple = [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
    }
}

function testSnake() {
    for(const segment of snake.body) {
        //test walls
        if(segment[0]>=boardSize || segment[0] < 0 || segment[1]>=boardSize || segment[1]<0){
            return false;
        }

        //test touching self
        let tester = 0;
        if(segment === snake.body[0]) {
            tester++;
        }
        if(tester > 1) {
            return false;
        }
    }
    return true;
}

function update(event) {
    switch (event.keyCode) {
        case 37:
            nextDirection = [-1, 0];
        case 38:
            nextDirection = [0, -1];
        case 39:
            nextDirection = [1, 0];
        case 40:
            nextDirection = [0, 1];
    }
}

function draw() {
    //background
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, 800, 800);

    //snek
    ctx.fillStyle = "purple";
    for(const segment of snake.body) {
        ctx.fillRect(segment[0]*step, segment[1]*step, step, step);
    }

    //apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0]*step, apple[1]*step, step, step)
}


//main file
document.addEventListener("keydown", update);
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
draw();
while(!isGameOver) {
    move();
    draw();
    isGameOver = testSnake();
}
