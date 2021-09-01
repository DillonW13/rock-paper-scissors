const buttons = document.querySelectorAll("button");
const parent = document.querySelector(".content");
const results = document.createElement("div");
const victorySound = document.querySelector("audio[class='victory-sound']");
const losingSound = document.querySelector("audio[class='losing-sound'");

results.setAttribute("style", "text-align: center; white-space: pre;" +
        "padding-top: 20px; background-image: url('Pics/notebook.jpg');" +
        "display: flex; flex: 1 0 80px; justify-content: center;" +
        "margin: auto; width: 380px; border: 2px solid black; border-radius: 15px;" + 
        "overflow: hidden;");
results.textContent = "First to 5 points wins! Select a choice. \r\nRock, paper, or scissors.";


let playerScore = 0; 
let computerScore = 0;
let isMatchOver = false;

buttons.forEach((button) => {

    button.addEventListener("click", () => {
        if (button.className === "rock-btn") {
            results.textContent = playRound("rock", computerPlay());
        } else if (button.className === "paper-btn") {
            results.textContent = playRound("paper", computerPlay());
        } else if (button.className === "scissors-btn") {
            results.textContent = playRound("scissors", computerPlay());
        } 

        if (!isMatchOver) {
            let scoreStr = getScore(results.textContent) + "\r\n";
            results.textContent += "\r\n" + scoreStr;
            checkForWinner();
        }

        if (button.className === "reset-btn") {
            resetGame();
            victorySound.pause();
            losingSound.pause();
            victorySound.currentTime = 0;
            losingSound.currentTime = 0;
        }

        if (isMatchOver && checkForWinner()) {
            results.textContent = "You won the match! \r\n Do you want a rematch?";
            victorySound.play();
        } else if (isMatchOver && !checkForWinner()) {
            results.textContent = "You lost the match. \r\n Do you want a rematch?";
            losingSound.play();
        }
        
    });
  });

parent.appendChild(results);

function computerPlay() {
    let randomChoice = Math.floor(Math.random() * 3 + 1);
    
    if (randomChoice === 1) {
        return "Rock";
    } else if (randomChoice === 2) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function playRound(playerSelection, computerSelection) {
    
    if (playerSelection.toLowerCase() === 'rock' && computerSelection.toLowerCase() === 'paper') {
        return "You lose! Paper beats rock.";
    } else if (playerSelection.toLowerCase() === 'scissors' && computerSelection.toLowerCase() === 'rock') {
        return "You lose! Rock beats scissors.";
    } else if (playerSelection.toLowerCase() === 'paper' && computerSelection.toLowerCase() === 'scissors') {
        return "You lose! Scissors beats paper.";
    } else if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        return "It's a tie!";
    } else {
        return("You won! " + playerSelection.substr(0, 1).toUpperCase()+playerSelection.substring(1).toLowerCase()
                + " beats " + computerSelection.toLowerCase() + ".");
    }
}

function getScore(roundResult) {
    if (roundResult.match("lose") !== null) {
        computerScore++;
    } else if (roundResult.match("tie") !== null) {
            
    } else {
        playerScore++;
    } 
    return "Computer: " + computerScore + "\t\t\t\tYou: " + playerScore;
}

function checkForWinner() {
    let winner = false;
    if (playerScore === 5 || computerScore === 5) {
        winner = (playerScore > computerScore) ? true : false;
        isMatchOver = true;
    }
    return winner;
}

function resetGame() {
    playerScore = 0; 
    computerScore = 0;
    isMatchOver = false;
    results.textContent = "First to 5 points wins! Select a choice. \r\nRock, paper, or scissors.";
}