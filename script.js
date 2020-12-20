const scoreDom = document.getElementById("score");
const resetDom = document.getElementById("reset");
const cellDoms = document.getElementsByClassName("cell");
const directions = {
  left: -1,
  up: -30,
  right: 1,
  down: 30,
};
const forbiddenHeadIdxRemainder = {
  left: 0,
  right: 29,
};

let appelDom = null;
let snakeDoms = [];
let frameLoop = null;
let headIdx = null;
let direction = "right";
let headDirection = "right";
let score = 0;

const stop = () => {
  if (frameLoop) {
    clearInterval(frameLoop);
    frameLoop = null;
  }
};

const setApple = () => {
  if (appelDom) {
    appelDom.classList.remove("apple");
  }

  do {
    appelDom = cellDoms[Math.floor(900 * Math.random())];
  } while (appelDom.classList.contains("snake"));

  appelDom.classList.add("apple");
};

const setScore = (num) => {
  score = num;
  scoreDom.innerHTML = score;
};

const addScore = () => {
  setScore(score + 1);
};

const start = () => {
  frameLoop = setInterval(() => {
    headDirection = direction;
    if (
      forbiddenHeadIdxRemainder[headDirection] &&
      forbiddenHeadIdxRemainder[headDirection] === headIdx % 30
    ) {
      return stop();
    }

    headIdx += directions[headDirection];
    
    if(!cellDoms[headIdx]) {
      return stop();
    }

    const nextDom = cellDoms[headIdx];

    if (nextDom.classList.contains("snake")) {
      return stop();
    }

    nextDom.classList.add("snake");
    snakeDoms.unshift(nextDom);

    if (nextDom.classList.contains("apple")) {
      addScore();
      setApple();
    } else {
      const lastSnakeDom = snakeDoms.pop();
      lastSnakeDom.classList.remove("snake");
    }
  }, 200);
};

const reset = () => {
  stop();
  setScore(0);
  direction = "right";

  for (const cellDom of snakeDoms) {
    cellDom.classList.remove("snake");
  }

  snakeDoms = [];

  snakeDoms.unshift(cellDoms[0]);
  snakeDoms[0].classList.add("snake");
  headIdx = 0;

  if (appelDom) {
    appelDom.classList.remove("apple");
  }

  appelDom = cellDoms[Math.ceil(899 * Math.random())];
  appelDom.classList.add("apple");
  start();
};

resetDom.addEventListener("click", reset);

document.onkeydown = (event) => {
  event = event || window.event;

  switch (event.code) {
    case "ArrowLeft":
      if (headDirection !== "right") {
        direction = "left";
      }
      break;
    case "ArrowUp":
      if (headDirection !== "down") {
        direction = "up";
      }
      break;
    case "ArrowRight":
      if (headDirection !== "left") {
        direction = "right";
      }
      break;
    case "ArrowDown":
      if (headDirection !== "up") {
        direction = "down";
      }
      break;
  }
};

const key4Dom = document.getElementById("key-4");
key4Dom.onclick = () => {
  if (headDirection !== "right") {
    direction = "left";
  }
};

const key2Dom = document.getElementById("key-2");
key2Dom.onclick = () => {
  if (headDirection !== "down") {
    direction = "up";
  }
};

const key6Dom = document.getElementById("key-6");
key6Dom.onclick = () => {
  console.log(1);
  if (headDirection !== "left") {
    direction = "right";
  }
};

const key8Dom = document.getElementById("key-8");
key8Dom.onclick = () => {
  console.log(1);
  if (headDirection !== "up") {
    direction = "down";
  }
};
