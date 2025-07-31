const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const shopDiv = document.getElementById("shop-container");
const timerEl = document.getElementById("timer");
const streakDisplay = document.getElementById("streakDisplay");
const levelBtns = document.querySelectorAll(".levelBtn");
const levelComplete = document.getElementById("levelComplete");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const exitBtn = document.getElementById("exitBtn");

const questionText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("scoreDisplay");
const bulbCountEl = document.getElementById("bulbCount");
const gameOver = document.getElementById("gameOver");
const hintBtn = document.getElementById("hintBtn");
const fiftyBtn = document.getElementById("fiftyBtn");
const skipBtn = document.getElementById("skipBtn");

let lvl = 0, qIdx = 0, selected = null, score = 0, bulbs = 0, streak = 0;
let timer;

const allLevelsPool = [/* all questions array exactly as you already have */];

function startTimer() {
  let timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      quiz.style.display = 'none';
      gameOver.style.display = 'flex';
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function updateDisplay() {
  scoreDisplay.textContent = `Score: ${score}`;
  bulbCountEl.textContent = bulbs;
  streakDisplay.textContent = `Streak: ${streak}`;
}

function showQuestion() {
  const pool = allLevelsPool[lvl];
  const current = pool.questions[qIdx];

  questionText.textContent = current.q;
  optionsEl.innerHTML = "";
  feedback.textContent = "";
  selected = null;
  submitBtn.style.display = "none";

  current.o.forEach(opt => {
    const div = document.createElement("div");
    div.textContent = opt;
    div.className = "option";
    div.onclick = () => {
      selected = opt;
      Array.from(optionsEl.children).forEach(c => c.style.background = "#e0e0e0");
      div.style.background = "#90ee90";
      submitBtn.style.display = "block";
    };
    optionsEl.appendChild(div);
  });

  resetTimer();
}

submitBtn.onclick = () => {
  clearInterval(timer);
  const correct = allLevelsPool[lvl].questions[qIdx].a;
  if (selected === correct) {
    feedback.textContent = "✅ Correct!";
    score += 10;
    bulbs += 5;
    streak++;
  } else {
    feedback.textContent = `❌ Wrong! Answer: ${correct}`;
    streak = 0;
  }
  updateDisplay();
  qIdx++;

  if (qIdx >= allLevelsPool[lvl].questions.length) {
    qIdx = 0;
    levelComplete.style.display = 'flex';
    quiz.style.display = 'none';
    return;
  }

  setTimeout(showQuestion, 1500);
};

levelBtns.forEach(btn => {
  btn.onclick = () => {
    lvl = parseInt(btn.dataset.level);
    intro.style.display = 'none';
    quiz.style.display = 'block';
    shopDiv.style.display = 'block';
    timerEl.style.display = 'block';
    streakDisplay.style.display = 'block';
    updateDisplay();
    showQuestion();
  };
});

nextLevelBtn.onclick = () => {
  levelComplete.style.display = 'none';
  lvl++;
  if (lvl >= allLevelsPool.length) {
    alert('🎉 You have completed all levels!');
    location.reload();
  } else {
    quiz.style.display = 'block';
    updateDisplay();
    showQuestion();
  }
};

exitBtn.onclick = () => {
  location.reload(); // or redirect to homepage URL
};

hintBtn.onclick = () => {
  if (bulbs >= 15) {
    bulbs -= 15;
    const correct = allLevelsPool[lvl].questions[qIdx].a;
    Array.from(optionsEl.children).forEach(opt => {
      if (opt.textContent === correct) opt.style.background = '#ffff99';
    });
    updateDisplay();
  }
};

fiftyBtn.onclick = () => {
  if (bulbs >= 10) {
    bulbs -= 10;
    const correct = allLevelsPool[lvl].questions[qIdx].a;
    let removed = 0;
    Array.from(optionsEl.children).forEach(opt => {
      if (opt.textContent !== correct && removed < 2) {
        opt.style.visibility = 'hidden';
        removed++;
      }
    });
    updateDisplay();
  }
};

skipBtn.onclick = () => {
  if (bulbs >= 40) {
    bulbs -= 40;
    qIdx++;
    if (qIdx >= allLevelsPool[lvl].questions.length) {
      levelComplete.style.display = 'flex';
      quiz.style.display = 'none';
      return;
    }
    updateDisplay();
    showQuestion();
  }
};

