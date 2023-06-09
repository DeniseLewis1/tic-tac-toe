const gameBoard = document.querySelector(".gameboard");
const infoDisplay = document.querySelector(".info");
const playButton = document.querySelector(".play-again");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.classList.add(index);
        cellElement.addEventListener("click", addGo);
        gameBoard.append(cellElement);
    })
}

function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = `It is now ${go}'s turn.`;
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"));
        
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            playAgain();
            return;
        }

        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"));
        
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            playAgain();
            return;
        }

        let turnsTaken = 0;
        allSquares.forEach(square => {
            if(square.hasChildNodes()) turnsTaken++;
        });

        if (turnsTaken === 9 && !infoDisplay.textContent.includes("Wins")) {
            infoDisplay.textContent = "Game Over!";
            playAgain();
            return;
        }
    });
}

function playAgain() {
    playButton.classList.remove("hide");
    playButton.addEventListener("click", clearBoard);
    
}

function clearBoard() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => square.remove());    
    playButton.classList.add("hide");
    go = "circle";
    infoDisplay.textContent = "Circle goes first";
    createBoard();
}

createBoard();