let interval;
let running = false;

//user input
function getInputValues() {
    //ensures that no NaN output is given
    const hours = parseInt(document.getElementById("hoursInput").value, 10) || 0;
    const minutes = parseInt(document.getElementById("minutesInput").value, 10) || 0;
    const seconds = parseInt(document.getElementById("secondsInput").value, 10) || 0;
    return { hours, minutes, seconds };
}


//function for time in milliseconds because milliseconds how we will get the output for seconds, minutes, and hours
function calculateDuration({ hours, minutes, seconds }) {
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

function formatTime(ms) {
    //equation for conversion
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return [
        hours, minutes, seconds, milliseconds
    ].map(unit => unit < 10 ? '0' + unit : unit).join(':');
}

function updateDisplay(time) {
    document.getElementById("display").textContent = formatTime(time);
}

function startTimer() {
    if (running) return;
    //calls the function for user input
    const inputValues = getInputValues();
    const duration = calculateDuration(inputValues);
    const startTime = Date.now();

    interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = duration - elapsedTime;

        //stop timer if remaining time is less or equal to 0
        if (remainingTime <= 0) {
            clearInterval(interval);
            updateDisplay(0);
            alert("Timer is done!");
            running = false;
        } else {
            //if it isn't less or equal to 0 keep updating the time
            updateDisplay(remainingTime);
        }
    }, 10);

    running = true;
}

//function to reset the timer
function reset() {
    clearInterval(interval);
    updateDisplay(0);
    running = false;
}
