// JavaScript source code
//Timer messages
const START_MSG = "Start Timer";
const CONTINUE_WORKING_MSG = "Continue Working";
const CONTINUE_BREAK_MSG = "Contine Your Break";
const BREAK_MSG = "Take a Break";
const PAUSED_MSG = "Paused Timer";

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

// TODO add sound on done working and done with break
class Pomodoro {
    constructor(countdownEl, msgEl) {
        this.countdownEl = countdownEl;
        this.msgEl = msgEl;
        this.clearTimer();
    }

    _setTime(h, m, s) {
        this.hours = Math.min(h, MAX_VALUE);
        this.minutes = Math.min(m, MAX_VALUE);
        this.seconds = Math.min(s, MAX_VALUE);
        this._updateCountdownText();
    }

    _updateCountdownText() {
        let h = formatTimeNum(this.hours);
        let m = formatTimeNum(this.minutes);
        let s = formatTimeNum(this.seconds);
        this.countdownEl.textContent = h + ":" + m + ":" + s;
    }

    // Always decrements by 1 second
    _decrementTimer() {
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
            this.doneCounting = true;
        }
    }

    startTimer() {
        this._setTime(this.workHours, this.workMinutes, this.workSeconds);
        this.msgEl.textContent = CONTINUE_WORKING_MSG;
        this.doneCounting = false;
        this.doneWorking = false;
        this.doneBreak = false;

        let self = this;
        this.timeInterval = setInterval(function () {
            // Todo: refactor
            if (!self.paused) {
                self._decrementTimer();
                self._updateCountdownText();
                if (self.doneCounting) {
                    if (!self.doneWorking) {
                        self.doneWorking = true;
                        self._setTime(self.breakHours, self.breakMinutes, self.breakSeconds);
                        self.msgEl.textContent = BREAK_MSG;
                        self.doneCounting = false;
                        playSound("sounds/ting.mp3");
                    } else {
                        self.clearTimer();
                        playSound("sounds/music_box.mp3");
                    }
                }
            }
        }, MILLISECONDS);
    }

    toggleTimer() {
        if (this.msgEl.textContent !== PAUSED_MSG) {
            this.msgEl.textContent = PAUSED_MSG;
        } else if (!this.doneWorking) {
            this.msgEl.textContent = CONTINUE_WORKING_MSG;
        } else if (!this.doneBreak) {
            this.msgEl.textContent = CONTINUE_BREAK_MSG;
        }
        this.paused = !this.paused;
    }

    clearTimer() {
        this._setTime(0, 0, 0);
        this.setWorkTime(0, 0, 0);
        this.setBreakTime(0, 0, 0);
        this.paused = false;
        this.doneCounting = true;
        this.doneWorking = true;
        this.doneBreak = true;

        this.msgEl.textContent = START_MSG;
        this._updateCountdownText();
        if (this.timeInterval) {
        clearInterval(this.timeInterval);
        }
    }

    setWorkTime(h, m, s) {
        this.workHours = h;
        this.workMinutes = m;
        this.workSeconds = s;
    }

    setBreakTime(h, m, s) {
        this.breakHours = h;
        this.breakMinutes = m;
        this.breakSeconds = s;
    }

    getTime() {
        return [this.hours, this.minutes, this.seconds];
    }

    isDone() {
        return this.doneCounting && this.doneWorking && this.doneBreak;
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

function getHoursAndMinutesFromInput(inputEl) {
    let minuteStr = inputEl.value;
    let minutes = convertStrToNum(minuteStr);
    hours = (minutes / MIN_IN_HOUR) | 0; // integer division
    minutes -= hours * MIN_IN_HOUR;
    return [hours, minutes]
}

function playSound(path) {
    var audio = new Audio(path);
    audio.loop = false;
    audio.play(); 
}

// Create Pomodoro Timer object
// Attach timer functionality to start, pause, and reset buttons
let countdown = document.getElementById("countdown");
let msg = document.getElementById("msg");
let pomodoro = new Pomodoro(countdown, msg);

let startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
    if (pomodoro.isDone()) {
        let workTime = getHoursAndMinutesFromInput(document.getElementById("work_timer_input"));
        pomodoro.setWorkTime(workTime[0], workTime[1], 0);

        let breakTime = getHoursAndMinutesFromInput(document.getElementById("break_timer_input"));
        pomodoro.setBreakTime(breakTime[0], breakTime[1], 0);

        pomodoro.startTimer();
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

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    pomodoro.clearTimer();
})