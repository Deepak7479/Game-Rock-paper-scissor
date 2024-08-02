const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resultElement = document.getElementById('result').querySelector('p');
const choices = Array.from(document.getElementsByClassName('choice'));
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
let rounds = parseInt(localStorage.getItem('rounds')) || 0;

const choicesMap = {
    'rock': '✊ ',
    'paper': '✋ ',
    'scissors': '✌ '
};

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return 'It\'s a tie!';
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        userScore++;
        return 'You win!';
    } else {
        computerScore++;
        return 'You lose!';
    }
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = getResult(userChoice, computerChoice);
        
        userScoreElement.textContent = userScore;
        computerScoreElement.textContent = computerScore;
        resultElement.textContent = `You chose ${choicesMap[userChoice]}, computer chose ${choicesMap[computerChoice]}. ${result}`;

        rounds++;

        localStorage.setItem('userScore', userScore);
        localStorage.setItem('computerScore', computerScore);
        localStorage.setItem('roundMessage', resultElement.textContent);
        localStorage.setItem('rounds', rounds);

        if (rounds >= 5) {
            window.location.href = 'final.html';
        } else {
            window.location.href = 'result.html';
        }
    });
});

// Ensure the scoreboard is updated when the page is loaded/reloaded
userScoreElement.textContent = userScore;
computerScoreElement.textContent = computerScore;
