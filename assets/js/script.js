let correctAnswer = "";
let correctScore = incorrectScore = askedQuestions = 0;
let totalQuestions;
let enteredNumberOfQuestions;
let url;
let userName;
let quizDuration;
let time;
let intervalId;

let answers = document.querySelector('.answers');
let _checkBtn = document.getElementById('check-answer');
let correct = document.getElementById('correct');
let inCorrect = document.getElementById('incorrect');
let _playAgainBtn = document.getElementById('play-again');
let alert = document.getElementById('alert');
let questionCounter = document.getElementById('question-counter');
let totalQ = document.getElementById('question-sum');
let countdown = document.getElementById('count-down-timer');
let form = document.getElementById('form');
let startQuizBtn = document.getElementById('start-quiz-button');

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        userName = document.getElementById('user-name').value;
        enteredNumberOfQuestions = document.getElementById('number-of-questions').value;
        totalQuestions = parseInt(enteredNumberOfQuestions, 10);
        quizDuration = totalQuestions;
        time = quizDuration*60;
        setInterval(countDown,1000);
        intervalId = setInterval(countDown,1000);
        url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=18&difficulty=medium&type=multiple`;
        loadQuestion();
        _checkBtn.addEventListener('click', checkAnswer);
        _playAgainBtn.addEventListener('click', playAgain);
        totalQ.textContent = totalQuestions;
        questionCounter.textContent = askedQuestions;
        alert.innerHTML = "";
        _playAgainBtn.style.display = "none";
        _checkBtn.style.display = "block";
        startQuizBtn.style.display ="none";
        document.getElementById("user-name").disabled = true;
        document.getElementById("number-of-questions").disabled = true;
    });
    
});

async function loadQuestion() {
    answers.innerHTML = '';
    let response = await fetch(`${url}`) 
    let data = await response.json(); 
    alert.innerHTML = "";
    showCategory(data.results[0]);
    DisplayQuestionAndAnswers(data.results[0]);
}

var countDown =  () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        countdown.textContent = minutes + ":" + seconds;
        time--;
        if (minutes < 0 ) {
            clearInterval(intervalId);
            _playAgainBtn.style.display = "block";
            _checkBtn.style.display = "none";
            let score = correctScore/totalQuestions;
            alert.innerHTML = `<p>Your score is ${score}</p>`;
         }
} 

 function showCategory(data) {
     let category = document.getElementById('category');
    category.innerHTML = `<span class = "category"> ${data.category} </span> <br>`
}

 function DisplayQuestionAndAnswers(data) {
     let question = document.getElementById('question');
     let incorrectAnswer = data.incorrect_answers;
     let answersList = incorrectAnswer;
     _checkBtn.disabled = false;
     correctAnswer = data.correct_answer;
     answersList.splice(Math.floor(Math.random() * 4), 0, correctAnswer);
     question.innerHTML = `${data.question}`;
    
    //  answers.innerHTML =
    //      answersList.map((answer) => {
    //        return `<p><span>${answer}</span> <p>`
    //      }).join('');
   
         answersList.forEach((answer)=>{
            let paragraph = document.createElement("p");
            let span = document.createElement("span")
            
            span.textContent = answer;
            paragraph.appendChild(span);
            answers.appendChild(paragraph);
            });

     selectAnswer();
     
 }

/**
 * de-select other answers when select one of them
 * this code is taken from https://github.com/prabinmagar/quiz-app-using-js-with-open-trivia-DB-api/blob/master/script.js  and modified accordingly  
 */

function selectAnswer() {
     answers.querySelectorAll('p').forEach((answer) => {
        answer.addEventListener('click', () => {
             if(answers.querySelector('.selected')){
                 const active = answers.querySelector('.selected');                
                 active.classList.remove('selected');
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
        // for some reason, this line of code  is not executing (the time is not reseting to 00:00)
       // clearInterval(intervalId); 
       setTimeout(() => {}, 5000);
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";        
        let score = correctScore/totalQuestions;
        alert.innerHTML = `<p>Your score is ${score}</p>`;   
        clearInterval(intervalId); 
    } else {
        setTimeout(() => {
            loadQuestion();
        }, 1000);
    }
   //  alert.innerHTML = "";
}

function playAgain() {
    correctScore = askedQuestions = incorrectScore = 0;
    alert.innerHTML = "";
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _checkBtn.disabled = false;
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
    correct.textContent = correctScore;
    incorrect.textContent = incorrectScore;
    loadQuestion();   
    time = quizDuration*60;      
    setInterval(countDown, 1000);
}