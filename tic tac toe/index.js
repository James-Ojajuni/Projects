let cells = document.querySelectorAll(".cell");
let [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9] = cells;
let turn = document.getElementById("turn");
let display = document.querySelector(".turn");
let inputs = document.querySelectorAll("input");
let [input1, input2] = inputs;
let gamePlayed = 0;
let spans = document.querySelectorAll("span");
let [span1, span2] = spans;

cells.forEach((cell) => {
    cell.addEventListener('click', handleClick);
})

function handleClick(event) {
    
    if (currentPlayer === players[0] && event.target.textContent.trim() === "") {
        event.target.textContent = player1marker;
        currentPlayer = players[(players.indexOf(currentPlayer) + 1)% players.length];
        if (gamePlayed ===  0 || gamePlayed % 2 ===0) {
            turn.textContent = `${input2.value.trim()}'s turn`
        } else {
            turn.textContent = `${input1.value.trim()}'s turn`
        }
        checkGame();
    } else if (currentPlayer === players[1] && event.target.textContent.trim() === "") {
        event.target.textContent = player2marker;
        currentPlayer = players[(players.indexOf(currentPlayer) + 1)% players.length];
        if (gamePlayed ===  0 || gamePlayed % 2 ===0) {
            turn.textContent = `${input1.value.trim()}'s turn`
        } else {
            turn.textContent = `${input2.value.trim()}'s turn`
        }    
        checkGame();
    }
}

// playerdata factory function
function createPlayerData(name, marker) {
    let playerName = `player${name}` 
    let playerMarker =  `${marker}`
    return {playerName, playerMarker}
}

// creating player one & two plus their markers
let {playerName: playerOne, playerMarker: player1marker} = createPlayerData("1", "X");
let {playerName: playerTwo, playerMarker: player2marker} = createPlayerData("2", "O");

// A players array that will be used to change the current player 
const players = [playerOne, playerTwo];
let currentPlayer = players[0];


function checkGame() {
    if (cell1.textContent === cell4.textContent && cell4.textContent === cell7.textContent && cell1.textContent.trim()) {
        condition(cell1.textContent === "X");
    } 
    
    else if (cell2.textContent === cell5.textContent && cell5.textContent === cell8.textContent && cell5.textContent.trim()) {
        condition(cell5.textContent === "X");
    }

    else if (cell3.textContent === cell6.textContent && cell6.textContent === cell9.textContent && cell3.textContent.trim()) {
        condition(cell6.textContent === "X");
    }

    else if (cell1.textContent === cell2.textContent && cell2.textContent === cell3.textContent && cell1.textContent.trim()) {
        condition(cell2.textContent === "X");
    }

    else if (cell4.textContent === cell5.textContent && cell5.textContent === cell6.textContent && cell5.textContent.trim()) {
        condition(cell5.textContent === "X");
    }

    else if (cell7.textContent === cell8.textContent && cell8.textContent === cell9.textContent && cell7.textContent.trim()) {
        condition(cell7.textContent === "X")
    }

    else if (cell3.textContent === cell5.textContent && cell5.textContent === cell7.textContent && cell5.textContent.trim()) {
        condition(cell5.textContent === "X");
    }

    else if (cell1.textContent === cell5.textContent && cell5.textContent === cell9.textContent && cell5.textContent.trim()) {
        condition(cell5.textContent === "X");
    } 

    else if (cell1.textContent.trim() && cell2.textContent.trim() && cell3.textContent.trim() && cell4.textContent.trim() && cell5.textContent.trim() && cell6.textContent.trim() && cell7.textContent.trim() && cell8.textContent.trim() && cell9.textContent.trim()) {
        display.style.visibility = "visible";
        display.textContent = "Draw!"
        cells.forEach((cell) => {
            cell.removeEventListener('click', handleClick);
        })
        gamePlayed++;
        turn.innerHTML = "<button>Restart ?</button>"
    }
}


function condition(value) {

    if (value) {
        display.style.visibility = "visible";
        if (gamePlayed ===  0 || gamePlayed%2 ===0) {
            display.textContent = `${input1.value.trim()} Wins!`
        } else {
            display.textContent = `${input2.value.trim()} Wins!`
        }
        
        cells.forEach((cell) => {
            cell.removeEventListener('click', handleClick);
        })
        gamePlayed++;
        turn.innerHTML = "<button>Restart ?</button>"
    }

    else {
        display.style.visibility = "visible";
        if (gamePlayed ===  0 || gamePlayed%2 ===0) {
            display.textContent = `${input2.value.trim()} Wins!`
        } else {
            display.textContent = `${input1.value.trim()} Wins!`
        }
        cells.forEach((cell) => {
            cell.removeEventListener('click', handleClick);
        })
        gamePlayed++;
        turn.innerHTML = "<button>Restart ?</button>"
    }

}

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let game = document.querySelector(".game");
    
    turn.textContent = input1.value.trim() +`'s turn`;
    
    if (input1.value.trim() && input2.value.trim()) {
        form.style.display = "none";
        game.style.display = "flex";
        if (gamePlayed ===  0 || gamePlayed%2 ===0) {
            span1.textContent = input1.value.trim() + ": X"
            span2.textContent = input2.value.trim() + ": O"
        } else {
            span1.textContent = input2.value.trim() + ": X"
            span2.textContent = input1.value.trim() + ": O"
        }
    } else {

    }
})

turn.addEventListener("click", (event) => {
    if (event.target.textContent === "Restart ?") {
        restartGame();
    }
});

function restartGame() {
    
    if (gamePlayed > 0) {

        cells.forEach((cell) => {
            cell.addEventListener('click', handleClick);
            cell.textContent = "";
        })

        if (gamePlayed ===  0 || gamePlayed % 2 ===0) {
            span1.textContent = input1.value.trim() + ": X"
            span2.textContent = input2.value.trim() + ": O"
            turn.textContent = input1.value.trim() +`'s turn`
        } else {
            span1.textContent = input2.value.trim() + ": X"
            span2.textContent = input1.value.trim() + ": O"
            turn.textContent = input2.value.trim() +`'s turn`
        }

        display.style.visibility = "hidden";
        currentPlayer = players[0]
    }
}