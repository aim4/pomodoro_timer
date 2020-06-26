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
    constructor() {

    }

    setTime(h, m, s) {
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
    }
}

// Attach function to countdown on play hit if timer_state is paused
// --> Get work and break inputs
// Attach function to pause countdown

// Attach function to reset to given work and break times
// --> Get work and break inputs