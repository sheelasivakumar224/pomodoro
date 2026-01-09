const timeDisplay = document.getElementById('time-display')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')

const circle = document.querySelector(".process-ring_circle")
const radius = circle.r.baseVal.value;
const circumference = 2*Math.PI*radius;
circle.style.strokeDasharray = `${circumference}`
circle.style.strokeDashoffset = 0;

let workDuration = 25*60;
let breakDuration = 5*60;
let timeleft = workDuration;
let isRunning = false;
let isBreak = false;
let timer;

function updateDisplay(){
    const minutes = Math.floor(timeleft/60);
    const seconds = timeleft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
}

function updateCircle(){
    const total = isBreak ? breakDuration : workDuration;
    const offset = circumference - (timeleft/total) * circumference;
    circle.style.strokeDashoffset = offset;
}

const sessionCountDisplay = document.getElementById('session-count');
const bgMusic = document.getElementById('bg-music');
const toggleMusicBtn = document.getElementById('toggle-music');
let sessionCount = 0;
let isMusicPlaying = 0;

// On off music button
toggleMusicBtn.addEventListener("click", () => {
    if (isMusicPlaying){
        bgMusic.pause();
    }else{
        bgMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;
});

// Timer start
function startTimer(){
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        timeleft--;
        updateDisplay();
        updateCircle();
        if(timeleft <= 0){
            clearInterval(timer);
            isRunning = false;
            if(!isBreak){
                sessionCount++;
                sessionCountDisplay.textContent = sessionCount; 
            }
            isBreak = !isBreak;
            timeleft = isBreak ? breakDuration: workDuration;
            updateDisplay();
            updateCircle();
        }
    }, 1000);
}

// Timer pause
function pauseTimer(){
    isRunning = false;
    clearInterval(timer);
}

// Timer reset
function resetTimer(){
    isRunning = false;
    clearInterval(timer);
    isBreak = false;
    timeleft = workDuration;
    updateCircle();
    updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
updateCircle();
updateDisplay();