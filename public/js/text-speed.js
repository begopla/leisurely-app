const textEl = document.querySelector("#text");
const speedEl = document.querySelector("#speed");
const text = "Find your next Activity, Register your Account today";

let speedIndex = 1;
let speed = 150;

textWriting();

function textWriting() {
  textEl.innerText = text.slice(0, speedIndex);

  speedIndex++;

  if (speedIndex >= text.length) {
    speedIndex = 1;
  }

  setTimeout(textWriting, speed);
}
