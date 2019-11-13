const timerDisplay = document.querySelector('.time-left');
const nextBreak = document.querySelector('.next-break');
const minutesSession = document.querySelector('#minutes-session');
const minutesBreak = document.querySelector('#minutes-break');
const playButton = document.querySelector('#play');


let countdown; //setInterval store

function sessionStart (seconds){
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