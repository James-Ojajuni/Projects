/* when the game begins, choose a color at random, add it to the gamePattern sequence 
and display that color to the user */
// wait for user input and check whether the input is correct.
/* If the user is correct move to the next sequence and clear the previous answers of
 the user to make space for the new answers. */
// In this sequence also add a new random color to the previously generated ones. 
// Display the whole sequence and wait for user input. 
/* While the user inputs, check if the answers are correct for each stage so far 
until the user gets them all correctly. */
/* Then move to the next sequence continually, forming a game loop unless the user gets 
the answers wrong. */
// After each new sequence, reduce the time between each color display by 40 milliseconds
/* When the user gets the answers wrong, reset the level,reset the gameSequence, then 
change the gameStarted back to false. When the user presses any key to restart, restart 
the game */
/* When the user clicks to answer play the sound for each color and apply the effects
for each click. When the game displays the sequence also, play the sound for each color
and apply the effects for each display.*/


var colors = ["color-red", "color-yellow", "color-blue", "color-green"];
var gamePattern = [];
var userAnswers = [];
var gameStarted = false;
var level = 0;
let interval = 1000;

// Attach the event listener initially
document.addEventListener("keydown", startGameHandler);
document.addEventListener("touchstart", startGameHandler);

function startGameHandler() {
    if (!gameStarted) {
        gameStarted = true; // Prevent multiple triggers
        document.removeEventListener("keydown", startGameHandler);
        document.removeEventListener("touchstart", startGameHandler); // Remove listener after first press
        setTimeout(gameBegins, 1500);
    }}

// A sequence of actions to be carried out when the game begins
function gameBegins() {

    if (gameStarted) {
        level ++;
        $("h2").text("Level " + level);
        let randomNumber = Math.floor(Math.random()*4);
        let randomColor = colors[randomNumber];
        gamePattern.push(randomColor);
        gamePattern.forEach((color, index) => {
            setTimeout(() => {
                let selectedColor = document.querySelector("." + color); // Select the element
                selectedColor.classList.add(color + "-lighter");
    
                playSound(color); // Play the sound
    
                setTimeout(() => {
                    selectedColor.classList.remove(color + "-lighter");
                }, 200); // Flash duration
    
            }, index * interval); // 1s interval between each color display
        });
        userAnswers = [];
        setTimeout(() => enableUserAnswer(), 1000);
        interval -= 40;
    }
}

// Playing sound corresponding to the color chosen at random or the clicked color   
function playSound(string) {
    let sounds = {
        "color-red": "./assets/sounds/doh.mp3",
        "color-yellow": "./assets/sounds/reh.mp3",
        "color-green": "./assets/sounds/mih.mp3",
        "color-blue": "./assets/sounds/soh.mp3",
        "wrong": "./assets/sounds/wrong.mp3"
    };

    new Audio(sounds[string]).play();
}

enableUserAnswer = () => { 
        $("[class|='color']").off("click");
        $("[class|='color']").on("click", function () {
            let elementClass = $(this).attr("class").split(" ")[0];
            playSound(elementClass);
            $(this).addClass(elementClass + "-lighter");
            setTimeout(() => {
                $(this).removeClass(elementClass + "-lighter");
            }, 200);
            userAnswers.push(elementClass);
            console.log(userAnswers);
            checkAnswers();
        });
}

// check if the userAnswer array is corresponding to the gamePattern so far on each click

checkAnswers = () => {
    let currentIndex = userAnswers.length - 1; // Get the last entered answer
    
    if (userAnswers[currentIndex] === gamePattern[currentIndex]) {
        console.log("Correct so far!"); 

        // Check if the user has completed the current level
        if (userAnswers.length === gamePattern.length) {
            setTimeout(() => {
                gameBegins(); // Move to the next level
            }, 1000);
        }
    } else {
        console.log("Wrong answer! Game Over.");
        gameOver();
    }
}

gameOver = () => {
    playSound("wrong");
    level = 0;
    $("h2").text("Game Over! Touch Screen or Press any key to restart.");
    interval = 1000;
    gamePattern = [];
    document.addEventListener("keydown", startGameHandler);
    document.addEventListener("touchstart", startGameHandler);
    gameStarted = false;
}