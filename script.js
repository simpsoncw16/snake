//Game board will be 20x20
//This means every step will be 40 pixels
const boardSize = 20;
const step = 40
let isGameOver = false;
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown", update);

//definitions
let defaultSnake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0],
    apple: [11, 8]
}
let snake = defaultSnake;

function move() {
    const newSeg = [snake.body[snake.body.length-1][0] + snake.nextDirection[0], snake.body[snake.body.length-1][1] + snake.nextDirection[1]];
    snake.body.push(newSeg);
    if(snake.body[snake.body.length-1][0] !== snake.apple[0] || snake.body[snake.body.length-1][1] !== snake.apple[1]) {
        snake.body.splice(0, 1);
    } else {
        snake.apple = [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
    }
    if(!testSnake()) {
        //clearInterval(game);
        //cancelAnimationFrame(draw);
        snake = defaultSnake;
        isGameOver = true;
    }
}

function testSnake() {
    for(const segment of snake.body) {
        //test walls
        if(segment[0]>= boardSize || segment[0] < 0 || segment[1]>=boardSize || segment[1]<0){
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
            snake.nextDirection = [-1, 0];
            break;
        case 38:
            snake.nextDirection = [0, -1];
            break;
        case 39:
            snake.nextDirection = [1, 0];
            break;
        case 40:
            snake.nextDirection = [0, 1];
            break;
    }
    console.log(event.keyCode);
}

function draw() {
    ctx.clearRect(0, 0, 800, 800);
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
    ctx.fillRect(snake.apple[0]*step, snake.apple[1]*step, step, step)
    
    requestAnimationFrame(draw);
}


//main file
draw();
let game = setInterval(move, 1000);


