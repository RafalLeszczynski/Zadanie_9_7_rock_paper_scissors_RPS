//js

//definicja zmiennych + wartości początkowe
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
    maxPoints =10;
//zmienne do ściągniecia kontenerów
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
    winnerElem = document.getElementById('js-winnerAnouncement');
//przycisk nowej gry
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);
//przyciski wyboru gracza (rps)  
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
<!--ogłoszenie otatecznego zwyciężcy - przypisanie-->       
winnerElem.style.display = 'none';
//funkcje
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        winnerElem.style.display = 'none';  
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();
//rozpoczęcie gry
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
//funkcja uruchomienia
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;

    computerPointsElem.innerHTML = computer.score;
}  
function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
    document.getElementById("js-playerPick").innerHTML = "Player selection";
    document.getElementById("js-computerPick").innerHTML = "Computer selection";
    document.getElementById("js-playerResult").innerHTML = "Player Score";
    document.getElementById("js-computerResult").innerHTML = "Computer Score";
  }//mentor: czyli if realizowany jak player.name inny niż null?
}
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    setGamePoints(); 
    endOfGame();
}
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  var winnerIs = 'player';
    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
}
function endOfGame() {
    if (player.score == maxPoints || computer.score == maxPoints){
        if (player.score == maxPoints){
            finalWinner = player.name;
        }
        else if (computer.score == maxPoints){
            finalWinner = "computer";
        }
    
        var displayString = "The winner is " + finalWinner;
        document.getElementById("js-nameOfWinner").innerHTML = displayString;
        document.getElementById("js-newGameButton").innerHTML = "Play again";
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        winnerElem.style.display = 'block';
    }
}





