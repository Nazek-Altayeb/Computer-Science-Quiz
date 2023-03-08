
document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', playAgain);
    _totalQuestion.textContent = totalQuestion;
    score.textContent = correctScore;
});

const answers = document.querySelector('.answers');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const score = document.getElementById('score');
const _totalQuestion = document.getElementById('question-sum');

let correctAnswer = "";
let correctScore = askedCount = 0;
let totalQuestion = 10;


async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';
    const result = await fetch(`${APIUrl}`)
    const data = await result.json();
    _result.innerHTML = "";
    showCategory(data.results[0]);
    showQuestion(data.results[0]);
}

function showQuestion(data){
    let question = document.getElementById('question');
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    question.innerHTML = `${data.question} <br> `;
   
    answers.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

function showCategory(data){
    let category = document.getElementById('category');
    category.innerHTML = `<span class = "category"> ${data.category} </span> <br>`
}

function selectOption(){
    answers.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(answers.querySelector('.selected')){
                const activeOption = answers.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer(){
    _checkBtn.disabled = true;
    if(answers.querySelector('.selected')){
        let selectedAnswer = answers.querySelector('.selected span').textContent;
        if(selectedAnswer == correctAnswer){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i></p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i></p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an answer!</p>`;
        _checkBtn.disabled = false;
    }
}


function checkCount(){
    askedCount++;
    _totalQuestion.textContent = totalQuestion;
    score.textContent = correctScore;
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);


        _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}


function playAgain(){
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    _totalQuestion.textContent = totalQuestion;
    score.textContent = correctScore;
    loadQuestion();
}