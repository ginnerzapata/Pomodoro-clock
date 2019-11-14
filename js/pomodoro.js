const timerDisplay = document.querySelector('.time-left');
const nextBreak = document.querySelector('.next-break');
const domMinutesSession = document.querySelector('#minutes-session');
const domMinutesBreak = document.querySelector('#minutes-break');
const buttons = [...document.querySelectorAll('.fa')];
const playButton = buttons[0];

let state
let session
let sessionMinutes
let pomodoroMinutes = 25;
let breakMinutes = 5;

domMinutesSession.textContent = pomodoroMinutes;
domMinutesBreak.textContent = breakMinutes;


function minutesToSeconds (min){return min * 60};

//play function
 function playSession(min){
   

     if (state === "stop") {
         state = "playing"
         const seconds = minutesToSeconds(min)
         timer(seconds);
     }
     else if (state === "playing") {
         state = "stop"
     }
    
 }

//buttons function
buttons.forEach(button => button.addEventListener('click',() => timeValues(button)));

function timeValues(button){
    if(button === buttons[1]) domMinutesSession.textContent = --pomodoroMinutes;
    else if(button === buttons[2]) domMinutesSession.textContent = ++pomodoroMinutes;
    else if(button === buttons[3]) domMinutesBreak.textContent = --breakMinutes;
    else if(button === buttons[4]) domMinutesBreak.textContent = ++breakMinutes;
    if(session == 'pomodoro'){
        sessionMinutes = pomodoroMinutes;
    } else if(session == 'break'){
        sessionMinutes = breakMinutes;
    }
    return;
}
//verify display is 0:00

function verifyDisplay(time){
    console.log(state)


    if(time == 0 || state === "stop"){
        playButton.setAttribute('class', 'fa fa-play-circle');

        if (session === 'break') {
            sessionMinutes = pomodoroMinutes
            session = 'pomodoro'
        }
        else if (session === 'pomodoro'){
            sessionMinutes = breakMinutes
            session = 'break'
            nextBreak.textContent = "You deserve a rest: Enjoy!";
        }

        


        const seconds = minutesToSeconds(sessionMinutes)
        displayTimeLeft(seconds);
       
        
    }

    if (session === "pomodoro") {
        console.log("YEAH POMODORO TIME")
    }

    if (session === 'break') {
        console.log("BREAK TIME!")
    }
}

// playSession(sessionMinutes)

// playSession(breakMinutes)

// t1 =   pomodoroMi9nutes, por  defecto, 

// t2 = breakMinutes, acabas de realizar un pomodoro


let countdown; //setInterval store

function timer (seconds, session){
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
        if(secondsLeft > 0 && secondsLeft < then){
            playButton.setAttribute('class', 'fa fa-stop-circle');
        }
        verifyDisplay(secondsLeft);
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

sessionMinutes = pomodoroMinutes
session = "pomodoro"
state = "stop"
playButton.addEventListener('click', () => {
    if (countdown) {
        clearInterval(countdown);
    }
    playSession(sessionMinutes)
})