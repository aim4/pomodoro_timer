// JavaScript source code
//Timer messages
const START_MSG = "Start Timer";
const CONTINUE_MSG = "Continue Working";
const BREAK_MSG = "Take a Break";
const RESUME_MSG = "Paused Timer";

// Time
const HOUR = 0;
const MIN = 0;
const SEC = 0;
const MAX_VALUE = 59;
const MIN_IN_HOUR = 60;
const SEC_IN_MIN = 60;
const MILLISECONDS = 1000;

// Timer buttons
const START = "Start";
const PAUSE = "Pause";
const RESUME = "Resume";
const RESET = "Reset";

class Pomodoro {
    constructor(countdownEl, msgEl) {
        this.countdownEl = countdownEl;
        this.msgEl = msgEl;
        this.clearTimer();
    }

    setTime(h, m, s) {
        this.hours = Math.min(h, MAX_VALUE);
        this.minutes = Math.min(m, MAX_VALUE);
        this.seconds = Math.min(s, MAX_VALUE);
        this.timeIsSet = true;
        this.updateCountdownText();
    }

    updateCountdownText() {
        let h = formatTimeNum(this.hours);
        let m = formatTimeNum(this.minutes);
        let s = formatTimeNum(this.seconds);
        this.countdownEl.textContent = h + ":" + m + ":" + s;
    }

    startTimer() {
        this.timerOn = true;
        this.msgEl.textContent = CONTINUE_MSG;

        let self = this;
        this.timeInterval = setInterval(function () {
            if (self.timerOn) {
                self.decrementTimer();
                self.updateCountdownText();
            }
        }, MILLISECONDS);
    };

    toggleTimer() {
        if (this.msgEl.textContent === CONTINUE_MSG) {
            this.msgEl.textContent = RESUME_MSG;
        } else {
            this.msgEl.textContent = CONTINUE_MSG;
        }
        this.timerOn = !this.timerOn;
    }

    clearTimer() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timerOn = false;
        this.timeIsSet = false;
        this.updateCountdownText();
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    // Always decrements by 1 second
    decrementTimer() {
        if (this.seconds > 0) {
            this.seconds -= 1;
        } else if (this.minutes > 0) {
            this.minutes -= 1;
            this.seconds = MAX_VALUE;
        } else if (this.hours > 0) {
            this.hours -= 1;
            this.minutes = MAX_VALUE;
            this.seconds = MAX_VALUE;
        } else {
            return;
        }
    }

    getTime() {
        return [this.hours, this.minutes, this.seconds];
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
let msg = document.getElementById("msg");
let pomodoro = new Pomodoro(countdown, msg);

let startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
    if (!pomodoro.timeIsSet) {
        // If time is set and start is pressed again, continue counting down?
        let minuteStr = document.getElementById("work_timer_input").value;
        let minutes = convertStrToNum(minuteStr);
        hours = (minutes / MIN_IN_HOUR) | 0; // integer division
        minutes -= hours * MIN_IN_HOUR;
        pomodoro.setTime(hours, minutes, 0);
        pomodoro.startTimer();;
    }
})

let pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", function () {
    pomodoro.toggleTimer();
    if (pauseButton.textContent === PAUSE) {
        pauseButton.textContent = RESUME;
    } else {
        pauseButton.textContent = PAUSE;
    }
})

// Attach function to reset to given work and break times
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    pomodoro.clearTimer();
})