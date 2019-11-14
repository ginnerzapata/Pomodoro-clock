const timerDisplay = document.querySelector('.time-left');
const nextBreak = document.querySelector('.next-break');
const domMinutesSession = document.querySelector('#minutes-session');
const domMinutesBreak = document.querySelector('#minutes-break');
const buttons = [...document.querySelectorAll('.fa')];
const playButton = buttons[0];

let sessionMinutes = 25;
let breakMinutes = 5;

domMinutesSession.textContent = sessionMinutes;
domMinutesBreak.textContent = breakMinutes;
//convert  minutes to seconds
let toSeconds;

function minutesToSeconds (min){toSeconds = min * 60};

//play function
 function playSession(min){
     minutesToSeconds(min);
     timer(toSeconds);
 }

//buttons function
buttons.forEach(button => button.addEventListener('click',() => timeValues(button)));

function timeValues(button){
    if(button === buttons[1]) domMinutesSession.textContent = --sessionMinutes;
    else if(button === buttons[2]) domMinutesSession.textContent = ++sessionMinutes;
    else if(button === buttons[3]) domMinutesBreak.textContent = --breakMinutes;
    else if(button === buttons[4]) domMinutesBreak.textContent = ++breakMinutes;
    return;
}

let countdown; //setInterval store

function timer (seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    clearInterval(countdown);


    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
};

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const displayTime = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = displayTime;
    timerDisplay.textContent = displayTime;
};

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    nextBreak.textContent = `Session ends at ${hour}:${minutes < 10 ? '0' :''}${minutes}`;

}

playButton.addEventListener('click', () => playSession(sessionMinutes));