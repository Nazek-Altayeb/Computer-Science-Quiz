let correctAnswer = "";
let correctScore = incorrectScore = askedQuestions = 0;
let totalQuestions = 10;
let answers = document.querySelector('.answers');
let _checkBtn = document.getElementById('check-answer');
let correct = document.getElementById('correct');
let inCorrect = document.getElementById('incorrect');
let _playAgainBtn = document.getElementById('play-again');
let alert = document.getElementById('alert');
let questionCounter = document.getElementById('question-counter');
let totalQ = document.getElementById('question-sum');

document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', playAgain);
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
    alert.innerHTML = "";
});

async function loadQuestion() {
    let response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
    let data = await response.json();
    alert.innerHTML = "";
    showCategory(data.results[0]);
    showQuestion(data.results[0]);
}

function showQuestion(data) {
    let question = document.getElementById('question');
    let incorrectAnswer = data.incorrect_answers;
    let answersList = incorrectAnswer;
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;   
    answersList.splice(Math.floor(Math.random() * 4), 0, correctAnswer);

    question.innerHTML = `${data.question} <br> `;

    answers.innerHTML = 
        answersList.map((answer) => {
            return `<li> <span>- ${answer}</span> </li>`
        }).join('');

    selectAnswer();
}

function showCategory(data) {
    let category = document.getElementById('category');
    category.innerHTML = `<span class = "category"> ${data.category} </span> <br>`
}

function selectAnswer() {
    answers.querySelectorAll('li').forEach((answer) => {
        answer.addEventListener('click', () => {
            answer.classList.add('selected');
        });
    });
}

function checkAnswer() {
    _checkBtn.disabled = true;
    if (answers.querySelector('.selected')) {
        let selectedAnswer = answers.querySelector('.selected span').textContent;
        if (selectedAnswer == correctAnswer) {
            correctScore++;
        } else {
            incorrectScore++;
        }
        countCorrectAndIncorrectAnswers();
    } else {
        alert.innerHTML = `<p>Please select an answer!</p>`;
        _checkBtn.disabled = false;
    }
}

function countCorrectAndIncorrectAnswers() {
    askedQuestions++;
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
    correct.textContent = correctScore;
    incorrect.textContent = incorrectScore;
    if (askedQuestions == totalQuestions) {
        setTimeout( () => {}, 5000);

        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout( () => {
            loadQuestion();
        }, 300);
    }
    alert.innerHTML = "";
}

function playAgain() {
    correctScore = askedQuestions = incorrectScore = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
    correct.textContent = correctScore;
    incorrect.textContent = incorrectScore;
    loadQuestion();
}