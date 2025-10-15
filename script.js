const questions = [
  {
    question: "Qual é o maior animal do mundo?",
    answers: [
      { id: 1, text: "Tubarão", correct: false },
      { id: 2, text: "Baleia azul", correct: true },
      { id: 3, text: "Elefante", correct: false },
      { id: 4, text: "Girafa", correct: false },
    ]
  },
  {
    question: "Qual é o planeta mais próximo do Sol?",
    answers: [
      { id: 1, text: "Vênus", correct: false },
      { id: 2, text: "Marte", correct: false },
      { id: 3, text: "Mercúrio", correct: true },
      { id: 4, text: "Terra", correct: false },
    ]
  },
{
  question: "Qual é o país mais populoso do mundo?",
  answers: [
    { id: 1, text: "China", correct: false },
    { id: 2, text: "Índia", correct: true },
    { id: 3, text: "Estados Unidos", correct: false },
    { id: 4, text: "Rússia", correct: false },
  ]
},
{
  question: "Qual é o maior oceano do planeta?",
  answers: [
    { id: 1, text: "Atlântico", correct: false },
    { id: 2, text: "Índico", correct: false },
    { id: 3, text: "Pacífico", correct: true },
    { id: 4, text: "Ártico", correct: false },
  ]
},
{
  question: "Quem pintou a Mona Lisa?",
  answers: [
    { id: 1, text: "Leonardo da Vinci", correct: true },
    { id: 2, text: "Michelangelo", correct: false },
    { id: 3, text: "Van Gogh", correct: false },
    { id: 4, text: "Picasso", correct: false },
  ]
},
{
  question: "Em que continente fica o Egito?",
  answers: [
    { id: 1, text: "Ásia", correct: false },
    { id: 2, text: "África", correct: true },
    { id: 3, text: "Europa", correct: false },
    { id: 4, text: "América", correct: false },
  ]
},
{
  question: "Qual é o metal cujo símbolo químico é Au?",
  answers: [
    { id: 1, text: "Prata", correct: false },
    { id: 2, text: "Alumínio", correct: false },
    { id: 3, text: "Ouro", correct: true },
    { id: 4, text: "Cobre", correct: false },
  ]
},
{
  question: "Qual é o rio mais longo do mundo?",
  answers: [
    { id: 1, text: "Nilo", correct: true },
    { id: 2, text: "Amazonas", correct: false },
    { id: 3, text: "Yangtzé", correct: false },
    { id: 4, text: "Mississipi", correct: false },
  ]
},
{
  question: "Quem foi o primeiro homem a pisar na Lua?",
  answers: [
    { id: 1, text: "Yuri Gagarin", correct: false },
    { id: 2, text: "Neil Armstrong", correct: true },
    { id: 3, text: "Buzz Aldrin", correct: false },
    { id: 4, text: "John Glenn", correct: false },
  ]
},
{
  question: "Em que país se originou o samba?",
  answers: [
    { id: 1, text: "Portugal", correct: false },
    { id: 2, text: "Cuba", correct: false },
    { id: 3, text: "Brasil", correct: true },
    { id: 4, text: "Espanha", correct: false },
  ]
},
{
  question: "Quantos continentes existem na Terra?",
  answers: [
    { id: 1, text: "Cinco", correct: false },
    { id: 2, text: "Seis", correct: false },
    { id: 3, text: "Sete", correct: true },
    { id: 4, text: "Oito", correct: false },
  ]
},
{
  question: "Qual é o idioma mais falado no mundo?",
  answers: [
    { id: 1, text: "Inglês", correct: false },
    { id: 2, text: "Mandarim", correct: true },
    { id: 3, text: "Espanhol", correct: false },
    { id: 4, text: "Hindi", correct: false },
  ]
}
];

// Elementos HTML
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const quizSection = document.querySelector(".quiz-section");
const userSection = document.querySelector(".user-section");
const resultSection = document.querySelector(".result-section");
const resultMessage = document.getElementById("result-message");
const usernameInput = document.getElementById("username");

let currentQuestionIndex = 0;
let score = 0;
let username = "";

function startQuiz() {
  username = usernameInput.value.trim();
  if (!username) {
    alert("Por favor, insira seu nome antes de começar!");
    return;
  }
  userSection.style.display = "none";
  quizSection.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.dataset.correct = answer.correct;
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  if (correct) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") button.classList.add("correct");
  });

  nextButton.style.display = "block";
}

function showScore() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";

  const total = questions.length;
  const erros = total - score;
  const percentual = Math.round((score / total) * 100);

  let mensagem = "";
  if (percentual >= 80) mensagem = "Excelente!";
  else if (percentual >= 50) mensagem = "Bom desempenho!";
  else mensagem = "Precisa melhorar!";

  resultMessage.innerHTML = `
    ${username}, você acertou <strong>${score}</strong> de <strong>${total}</strong> questões.<br>
    Aproveitamento: <strong>${percentual}%</strong><br><br>
    ${mensagem}
  `;

  
  const ctx = document.getElementById("resultChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Acertos", "Erros"],
      datasets: [{
        label: "Resultado",
        data: [score, erros],
        backgroundColor: ["#4CAF50", "#E53935"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", handleNextButton);
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", () => {
  resultSection.style.display = "none";
  userSection.style.display = "flex";
  usernameInput.value = "";
});


document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});