let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let startTime;
let lapNumber = 1;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapTimes = document.getElementById("lapTimes");

// Function to format the elapsed time
function formatTime(time) {
  const ms = Math.floor(time % 1000 / 10);
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / (1000 * 60)) % 60;
  const hours = Math.floor(time / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// Start/Stop button functionality
startStopBtn.addEventListener("click", function() {
  if (isRunning) {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    startStopBtn.textContent = "Stop";
  }
  isRunning = !isRunning;
});

// Reset button functionality
resetBtn.addEventListener("click", function() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  startStopBtn.textContent = "Start";
  display.textContent = "00:00:00.00";
  lapTimes.innerHTML = "";
  lapNumber = 1;
});

// Lap button functionality
lapBtn.addEventListener("click", function() {
  if (isRunning) {
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapNumber}: ${formatTime(elapsedTime)}`;
    lapTimes.appendChild(lapItem);
    lapNumber++;
  }
});
