let isRunning = false;
let startTime;
let lapStartTime;

function startStop() {
  const startStopBtn = document.getElementById("startStopBtn");

  if (isRunning) {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Lap";
  } else {
    startTime = new Date() - (lapStartTime || 0);
    timer = setInterval(updateTime, 10);
    startStopBtn.textContent = "Stop";
    lapResetBtn.textContent = "Lap";
  }

  isRunning = !isRunning;
}

function lapReset() {
  const lapResetBtn = document.getElementById("lapResetBtn");
  const lapList = document.getElementById("lapList");

  if (isRunning) {
    const lapTime = new Date() - lapStartTime;
    const formattedTime = formatTime(lapTime);

    const lapItem = document.createElement("li");
    lapItem.textContent = formattedTime;
    lapList.appendChild(lapItem);

    lapStartTime = new Date();
  } else {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Reset";
    document.getElementById("stopwatch").textContent = "00:00:00";
    lapList.innerHTML = "";
    isRunning = false;
  }
}

function updateTime() {
  const currentTime = new Date() - startTime;
  const formattedTime = formatTime(currentTime);

  document.getElementById("stopwatch").textContent = formattedTime;
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor((date.getMilliseconds() % 1000) / 10).toString().padStart(2, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}
