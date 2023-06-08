const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// initialsisng the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // empty grids UI
    boxes.forEach( (box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove green colour
        // to do so, initialise box property to css 
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

function handleClick(index) {
    // process further if grid index is empty
    if(gameGrid[index] === "") {
        // this line makes changes in UI
        boxes[index].innerText = currentPlayer;

        // this line makes changes in gameGrid to track result
        gameGrid[index] = currentPlayer;

        // if a grid is already marked, make cursor default
        boxes[index].style.pointerEvents = "none";

        // now, swap the turn 
        swapTurn();

        // check if someone already won
         checkGameOver();
    }
}

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    // update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach( (position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {

            // check if winner is X
            if(gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            // disable pointer event, because winner is declared
            boxes.forEach( (box) => {
                box.style.pointerEvents = "none";
            })

            // now, we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // if answer is non-empty, that means we have a winner
    if(answer !== "") {
        // declare who is winner
        gameInfo.innerText = `Winner Player - ${answer}`;
        
        // if X/O won, display "New Game" button
        newGameBtn.classList.add("active");
        return ;
    }

    // when there is no winner. Tie condition
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") fillCount++;
    }); 

    // board is filled, game is tie
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tie!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener('click', initGame);