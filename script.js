// JavaScript source code
//Timer messages
const START_MSG = "Start Timer";
const CONTINUE_MSG = "Continue Working";
const BREAK_MSG = "Take a Break";
const RESUME_MSG = "Resume Timer";

// Time
const HOUR = 0;
const MIN = 0;
const SEC = 0;
const MAX_VALUE = 59;
const MIN_IN_HOUR = 60;
const SEC_IN_MIN = 60;

// Timer buttons
const START = "Start";
const RESUME = "Resume";
const RESET = "Reset";

class Pomodoro {
    constructor(countdownEl) {
        this.countdownEl = countdownEl;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timerOn = false;
    }

    setTime(h, m, s) {
        this.hours = Math.min(h, MAX_VALUE);
        this.minutes = Math.min(m, MAX_VALUE);
        this.seconds = Math.min(s, MAX_VALUE);
        this.updateCountdownText();
        this.timerOn = true;
    }

    getTime() {
        return [this.hours, this.minutes, this.seconds];
    }

    updateCountdownText() {
        let h = formatTimeNum(this.hours);
        let m = formatTimeNum(this.minutes);
        let s = formatTimeNum(this.seconds);
        this.countdownEl.textContent = h + ":" + m + ":" + s;
    }

    stopTimer() {
        this.timerOn = false;
    }
}

function formatTimeNum(t) {
    return t.toString().padStart(2, 0);
}

function convertStrToNum(s) {
    let num = +s;
    if (isNaN(num)) {
        return 0;
    }
    return num;
}
// Attach function to countdown on play hit if timer_state is paused
let countdown = document.getElementById("countdown");
let pomodoro = new Pomodoro(countdown);

let startButton = document.getElementById("start");

startButton.addEventListener("click", function () {
    let minuteStr = document.getElementById("work_timer_input").value;
    let minutes = convertStrToNum(minuteStr);
    hours = (minutes / MIN_IN_HOUR) | 0; // integer division
    minutes -= hours * MIN_IN_HOUR
    pomodoro.setTime(hours, minutes, 0)
})

let pauseButton = document.getElementById("pause");

pauseButton.addEventListener("click", function () {
    pomodoro.stopTimer();
})

// Attach function to reset to given work and break times
// --> Get work and break inputs
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    pomodoro.setTime(0, 0, 0)
})