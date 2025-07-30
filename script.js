const levels = [
  {
    name: "Level 1",
    questions: [
      {
        q: "What planet is known as the Red Planet?",
        o: ["Earth", "Mars", "Jupiter", "Venus"],
        a: "Mars"
      },
      {
        q: "What gas do plants absorb from the atmosphere?",
        o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        a: "Carbon Dioxide"
      }
    ]
  },
  {
    name: "Level 2",
    questions: [
      {
        q: "What is H2O more commonly known as?",
        o: ["Salt", "Oxygen", "Water", "Hydrogen"],
        a: "Water"
      },
      {
        q: "What part of the cell contains genetic material?",
        o: ["Nucleus", "Mitochondria", "Cytoplasm", "Ribosome"],
        a: "Nucleus"
      }
    ]
  }
];

let lvl = 0;
let qIdx = 0;
let score = 0;
let bulbs = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedback = document.getElementById("feedback");
const submitBtn = document.getElementById("submitBtn");
const scoreboard = document.getElementById("scoreboard");

let selected = null;

function loadQuestion() {
  const curr = levels[lvl].questions[qIdx];
  questionEl.textContent = `${levels[lvl].name}: ${curr.q}`;
  optionsEl.innerHTML = "";
  feedback.textContent = "";
  selected = null;

  curr.o.forEach(option => {
    const label = document.createElement("label");
    label.classList.add("option");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = option;
    radio.onclick = () => selected = radio.value;
    label.appendChild(radio);
    label.append(" " + option);
    optionsEl.appendChild(label);
  });

  submitBtn.disabled = false;
}

function updateDisplay() {
  scoreboard.textContent = `Score: ${score} | Bulbs: ${bulbs}`;
}

submitBtn.onclick = () => {
  if (!selected) return;
  const curr = levels[lvl].questions[qIdx];

  if (selected === curr.a) {
    feedback.style.color = '#080';
    feedback.textContent = '✅ Correct!';
    score++;
    bulbs++;
  } else {
    feedback.style.color = '#d00';
    feedback.textContent = '❌ Wrong!';
  }

  updateDisplay();
  submitBtn.disabled = true;

  setTimeout(nextQuestion, 1000);
};

function nextQuestion() {
  qIdx++;
  if (qIdx >= levels[lvl].questions.length) {
    lvl++;
    qIdx = 0;
  }

  if (lvl >= levels.length) {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    feedback.textContent = `Your final score is ${score}. Bulbs earned: ${bulbs}`;
    submitBtn.style.display = "none";
    return;
  }

  loadQuestion();
}

loadQuestion();
