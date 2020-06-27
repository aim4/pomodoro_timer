// JavaScript source code
//Timer messages
const START_MSG = "Start Timer"
const CONTINUE_MSG = "Continue Working"
const BREAK_MSG = "Take a Break"
const RESUME_MSG = "Resume Timer"

// Time remaining
const HOUR = 0
const MIN = 0
const SEC = 0

// Timer buttons
const START = "Start"
const RESUME = "Resume"
const RESET = "Reset"

class Pomodoro {
    constructor(countdownEl) {
        this.countdownEl = countdownEl;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    setTime(h, m, s) {
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
        this.updateCountdownText();
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
}

function formatTimeNum(t) {
    return t.toString().padStart(2, 0);
}

// Attach function to countdown on play hit if timer_state is paused
let countdown = document.getElementById("countdown");
let pomodoro = new Pomodoro(countdown);

let startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
    // Get work time input and break time input
    pomodoro.setTime(1, 1, 1)
    // Flip start to pause
})

// Attach function to reset to given work and break times
// --> Get work and break inputs
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    pomodoro.setTime(0, 0, 0)
})