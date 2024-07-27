let timer;
let startTime;
let elapsedTime = 0;
let running = false;

//using milliseconds to figure out the hours, minutes, and seconds 
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    ms %= 1000;
    const milliseconds = Math.floor(ms / 10);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

//function that updates time constantly based on the time since the timer has started
function updateDisplay() {
    const now = new Date().getTime();
    const currentElapsed = elapsedTime + (now - startTime);
    document.getElementById('display').textContent = formatTime(currentElapsed);
}

function start() {
    if (!running) {
        startTime = new Date().getTime();
        timer = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(timer);
        elapsedTime += new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById('display').textContent = '00:00:00:00';
    elapsedTime = 0;
    running = false;
}

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('stopButton').addEventListener('click', stop);
document.getElementById('resetButton').addEventListener('click', reset);
