// Your script here.
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userInput");
  const button = document.querySelector("button");
  const countDown = document.getElementById("countDown");
  const endTimeDisplay = document.getElementById("endTime");

  let timer; // to store the interval

  function startCountdown(minutes) {
    clearInterval(timer); // Clear any existing timer

    const endTime = new Date(Date.now() + minutes * 60 * 1000);

    // Show end time
    endTimeDisplay.textContent = "End Time: " + formatTime(endTime);

    timer = setInterval(function () {
      const now = new Date();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        countDown.textContent = "Time's up!";
        return;
      }

      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);

      countDown.textContent = `Remaining Time: ${pad(mins)}:${pad(secs)}`;
    }, 1000);
  }

  // Helper to format numbers to two digits
  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  // Helper to format time in HH:MM AM/PM
  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${pad(hours)}:${pad(minutes)} ${ampm}`;
  }

  // Start timer on button click
  button.addEventListener("click", function () {
    const minutes = parseInt(input.value);
    if (!isNaN(minutes) && minutes > 0) {
      startCountdown(minutes);
    }
  });

  // Start timer when pressing Enter key
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const minutes = parseInt(input.value);
      if (!isNaN(minutes) && minutes > 0) {
        startCountdown(minutes);
      }
    }
  });
});
