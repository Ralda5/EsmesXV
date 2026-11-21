const eventDate = new Date("2027-04-03T15:30:00-06:00");

function updateCountdown() {
  const remaining = Math.max(0, eventDate.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  document.getElementById("days").textContent = Math.floor(remaining / day);
  document.getElementById("hours").textContent = String(Math.floor((remaining % day) / hour)).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor((remaining % hour) / minute)).padStart(2, "0");
  document.getElementById("seconds").textContent = String(Math.floor((remaining % minute) / 1000)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const copyButton = document.getElementById("copy-number");
const toast = document.getElementById("toast");

copyButton.addEventListener("click", async () => {
  const number = document.getElementById("event-number-text").textContent;

  try {
    await navigator.clipboard.writeText(number);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = number;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 1800);
});
