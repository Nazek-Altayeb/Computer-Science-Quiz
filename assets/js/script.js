let correctAnswer = "";
let correctScore = incorrectScore = askedQuestions = 0;
let totalQuestions = 10;

document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', playAgain);
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
});

const answers = document.querySelector('.answers');
const _checkBtn = document.getElementById('check-answer');
const correct = document.getElementById('correct');
const inCorrect = document.getElementById('incorrect');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const questionCounter = document.getElementById('question-counter');
const totalQ = document.getElementById('question-sum');



async function loadQuestion() {
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';
    const result = await fetch(`${APIUrl}`)
    const data = await result.json();
    _result.innerHTML = "";
    showCategory(data.results[0]);
    showQuestion(data.results[0]);
}

function showQuestion(data) {
    let question = document.getElementById('question');
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let answersList = incorrectAnswer;
    answersList.splice(Math.floor(Math.random() * 4), 0, correctAnswer);

    question.innerHTML = `${data.question} <br> `;

    answers.innerHTML = `
        ${answersList.map((answer, index) => `
            <li> ${index + 1}. <span>${answer}</span> </li>
        `).join('')}
    `;
    selectAnswer();
}

function showCategory(data) {
    let category = document.getElementById('category');
    category.innerHTML = `<span class = "category"> ${data.category} </span> <br>`
}

function selectAnswer() {
    answers.querySelectorAll('li').forEach(function (answer) {
        answer.addEventListener('click', function () {
            if (answers.querySelector('.selected')) {
                let activeAnswer = answers.querySelector('.selected');
                activeAnswer.classList.remove('selected');
            }
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
        _result.innerHTML = `<p>Please select an answer!</p>`;
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
        setTimeout(function () {
            console.log("");
        }, 5000);

        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function () {
            loadQuestion();
        }, 300);
    }
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