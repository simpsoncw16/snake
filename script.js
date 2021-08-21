//Game board will be 15x15
const boardSize = 15;
let isGameOver = false;

//definitions
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
    if (event.which == 37) {
        nextDirection = [-1, 0];
    }
    if (event.which == 38) {
        nextDirection = [0, 1];
    }
    if (event.which == 39) {
        nextDirection = [1, 0];
    }
    if (event.which == 40) {
        nextDirection = [0, -1];
    }
}



//main file
document.addEventListener('keydown', update);

while(!isGameOver) {
    move();
    

    isGameOver = testSnake();
}
