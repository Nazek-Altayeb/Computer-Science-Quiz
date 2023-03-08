
document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    checkAnswerBtn.addEventListener('click', checkAnswer);
    playAgainBtn.addEventListener('click', playAgain);
    totalQuestions.textContent = totalQuestion;
    score.textContent = correctScore;
});

const answers = document.querySelector('.answers');
const checkAnswerBtn = document.getElementById('check-answer');
const playAgainBtn = document.getElementById('play-again');
const result = document.getElementById('result');
const score = document.getElementById('score');
const totalQuestions = document.getElementById('question-sum');

let correctAnswer = "";
let correctScore = askedCount = 0;
let totalQuestion = 10;


async function loadQuestion(){
    const APIUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';
    const result = await fetch(`${APIUrl}`)
    const data = await result.json();
    result.innerHTML = "";
    showCategory(data.results[0]);
    showQuestion(data.results[0]);
}

function showQuestion(data){
    let question = document.getElementById('question');
    checkAnswerBtn.disabled = false;
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
    checkAnswerBtn.disabled = true;
    if(answers.querySelector('.selected')){
        let selectedAnswer = answers.querySelector('.selected span').textContent;
        if(selectedAnswer == correctAnswer){
            correctScore++;
            result.innerHTML = `<p><i class = "fas fa-check"></i></p>`;
        } else {
            result.innerHTML = `<p><i class = "fas fa-times"></i></p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an answer!</p>`;
        checkAnswerBtn.disabled = false;
    }
}


function checkCount(){
    askedCount++;
    totalQuestions.textContent = totalQuestion;
    score.textContent = correctScore;
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);


        result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        playAgainBtn.style.display = "block";
        checkAnswerBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}


function playAgain(){
    correctScore = askedCount = 0;
    playAgainBtn.style.display = "none";
    checkAnswerBtn.style.display = "block";
    checkAnswerBtn.disabled = false;
    totalQuestions.textContent = totalQuestion;
    score.textContent = correctScore;
    loadQuestion();
}