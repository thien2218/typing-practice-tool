window.addEventListener('load', init)
const listOfWords = [
    'nature',
    'car',
    'distribute',
    'lemon',
    'flower',
    'tempo',
    'master',
    'cartoon',
    'display',
    'dog',
    'power',
    'powder',
    'neat',
    'destruction',
    'vary',
    'league',
    'legendary',
    'number',
    'laughter',
    'comedy',
    'hacker',
    'disorder',
    'cow',
    'down',
    'count',
    'mind',
    'top',
    'house',
    'calculate',
    'tragedy',
    'king',
    'alpha',
    'lie',
    'lion',
    'whale',
    'snake',
    'skirt',
    'consequential',
    'dynamic',
    'call',
    'phone',
    'smart',
    'reflexive',
    'minus',
    'conquer',
    'defend',
    'dominate',
    'watch',
    'listen',
    'filter',
    'fighter',
    'translate',
    'offensive',
]

const level = {
    novice: 10,
    easy: 5,
    medium: 3,
    hard: 2
}

const announcer = ['Great!', 'Excellent!', 'Good!', 'Perfect!', 'Nice'];

let levelTimer = level.easy;
let givenTime = levelTimer;
let playerScore = 0;
let playerTotalScore = 0;
let highscore = 0;
let isPlaying = true;
let startGame;
let started = false;
let again = false;

const wordInput = document.getElementById('word-input');
const time = document.getElementById('time');
const score = document.getElementById('score');
const totalTime = document.getElementById('total-time');
const givenWord = document.getElementById('given-word');
const message = document.getElementById('message');
const totalScore = document.getElementById('total-score');
const announce = document.getElementById('announce')

totalTime.innerHTML = levelTimer;

function init(){
    showWord(listOfWords);
    setInterval(countdown, 950);
    setInterval(gameOver, 50);
    wordInput.addEventListener('input', refresh);
}

function showWord(wordList){
    givenWord.innerHTML = wordList[Math.floor(Math.random() * wordList.length)]
}

function announcement(announcer){
    announce.innerHTML = announcer[Math.floor(Math.random() * announcer.length)]
}

var bonusScore;

if(levelTimer === level.easy){
    bonusScore = 1
} else if(levelTimer === level.medium){
    bonusScore = 3
} else if(levelTimer === level.hard){
    bonusScore = 5
} else{
    bonusScore = 0.5
}

function refresh(){
    if(matchWord()){
        givenTime = levelTimer;
        isPlaying = true;
        showWord(listOfWords);
        announcement(announcer);
        wordInput.value = '';
        playerScore += bonusScore;
        playerTotalScore += bonusScore;
    }
    score.innerHTML = playerScore;
    totalScore.innerHTML = playerTotalScore;
}

function restartGame(){
    givenTime = levelTimer;
    isPlaying = true;
    showWord(listOfWords);
    wordInput.value = '';
    playerScore = 0;
    playerTotalScore = 0;
    score.innerHTML = playerScore;
    totalScore.innerHTML = 0;
    announce.innerHTML = '';
}

function matchWord(){
    if(wordInput.value === givenWord.innerHTML){
        return true
    } else{
        return false
    }
}

function countdown() {
    if(givenTime >= 0 && started == true) {
        shownTime = givenTime--;
        time.innerHTML = shownTime;
    } if(shownTime === 0) {
        isPlaying = false
    }
}

function clickStart(){
    const button = document.querySelectorAll('#start-game')
    button.forEach(button => button.addEventListener('click', () => {
            const parent = button.parentElement;
            const nextForm = parent.nextElementSibling;
            next(parent, nextForm);
            return started = true
        })
    )
}

clickStart()

function next(parent, nextForm){
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');
    nextForm.classList.remove('inactive')
}

function gameOver(){
    const button = document.querySelectorAll('#word-input')
    button.forEach(button => {
        const parent = button.parentElement;
        const nextForm = parent.nextElementSibling;
        if(!isPlaying && shownTime === 0) {
            next(parent, nextForm);
            wordInput.value = '';
            return started = true
        }
    })
}

function clickPlayagain(){
    const button = document.querySelectorAll('#play-again')
    button.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const nextForm = parent.previousElementSibling;
            next(parent, nextForm);
            restartGame()
        })
    })
}

clickPlayagain()

