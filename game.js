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
                + " beats " + computerSelection + ".");
    }
}

function game() {
    let computerScore = 0; 
    let playerScore = 0;
    let roundResult;
    let computerChoice;
    let playerSelection; 

    for (let i = 0; i < 5; i++) {
        computerChoice = computerPlay();
        playerSelection = prompt("Choose rock, paper, scissors: ");
        roundResult = playRound(playerSelection, computerChoice);
        
        if (roundResult.match("lose") !== null) {
            computerScore++;
        } else if (roundResult.match("tie") !== null) {
            
        } else {
            playerScore++;
        }

        console.log("(Round " + (i + 1) + ") Computer Score: " + computerScore + 
                    "\t Player Score: " + playerScore);
        console.log(roundResult);
    }

    if (playerScore === computerScore) {
        return "This match is a tie!";
    } else if (playerScore < computerScore) {
        return "You lost the match! :(";
    } else {
        return "You won the match! :)";
    }
}

console.log(game());



