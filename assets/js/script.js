/* jshint esversion: 8*/
let correctAnswer = "";
let correctScore  = 0;
let incorrectScore = 0;
let askedQuestions = 0;
let question = "";
let category = "";
let totalQuestions;
let enteredNumberOfQuestions;
let url;
let userName;
let quizDuration;
let time;
let intervalId;
let level;

const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
const answers = document.querySelector('.answers');
const submitAnswerBtn = document.getElementById('check-answer');
const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');
const takeQuizAgainBtn = document.getElementById('play-again');
const alert = document.getElementById('alert');
const questionCounter = document.getElementById('question-counter');
const totalQ = document.getElementById('question-sum');
const timer = document.getElementById('count-down-timer');
const form = document.getElementById('form');
const startQuizBtn = document.getElementById('start-quiz-button');
const questionAnswersArea = document.getElementById('question-answers-area');

/**
 * execute the following on DOM load
 * 1 - load a number of questions from the API according to what the user has entered in the quiz-form.
 * 2 - prevent entering new data after pressing on 'start quiz'.
 * 3 - calculate the quiz duration (in minutes) according to the number of questions the user has typed in the quiz-form.
 * 4 - invoke checkAnswer function upon user click (applicable  only when user select an answer).
 * 5 - invoke playAgain function upon user click (visible only when user finishes answering all questions).
 * 6 - start quiz stop-watch after clicking on 'start-quiz'
 */

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        /** get name , amount of questions entered by user */
        filInUserInfo();

        /** fill in data relates to url and load data from api accordingly */
        totalQuestions = parseInt(enteredNumberOfQuestions, 10);
        quizDuration = totalQuestions;
        time = quizDuration * 60;
        getDifficultyLevel();
        url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=18&difficulty=${level}&type=multiple`;      
        
        /** call loadData function to load data from api */
        loadData();

        /** call  checkAnswer function once clicking on 'submit answer' button*/
        submitAnswerBtn.addEventListener('click', checkAnswer);

        /** call  playAgain function once clicking on 'take quiz answer' button*/
        takeQuizAgainBtn.addEventListener('click', takeQuizAgain);

        /** fill in  variables with initial values*/
        totalQ.textContent = totalQuestions;
        questionCounter.textContent = askedQuestions;
        alert.innerHTML = "";

        /** disable 'take quiz again' button */
        takeQuizAgainBtn.style.display = "none";

        /** enable 'submit answer' button, and display quiz area */
        submitAnswerBtn.style.display = "block";
        questionAnswersArea.style.display = "block";

        /** disable 'start quiz' button */
        startQuizBtn.style.display = "none";

        /** freeze the quiz form area from entering new data after clicking on start-quiz button */
        document.getElementById("user-name").disabled = true;
        document.getElementById("number-of-questions").disabled = true;
        document.getElementById("easy").disabled = true;
        document.getElementById("medium").disabled = true;
        document.getElementById("hard").disabled = true;

        /** start stop watch */
        intervalId = setInterval(countDown, 1000);
    });

});

/**
 * 1 - empty html page content
 * 2 - Load data from open TRIVIA Api 
 * Note : The idea of loading the data from TRIVIA Api inspired from : https://github.com/prabinmagar/quiz-app-using-js-with-open-trivia-DB-api/blob/master/script.js
 */
async function loadData() {
    answers.innerHTML = '';
    question.innerHTML = '';
    alert.innerHTML = "";
    category.innerHTML = '';
    let response = await fetch(`${url}`);
    let data = await response.json();
    displayCategory(data.results[0]);
    DisplayQuestionAndAnswers(data.results[0]);
}

/** 
 * Get the value of difficulty level from the user
*/
function getDifficultyLevel(){
    if(easy.checked == true){
        level = 'easy';
    }else if(medium.checked == true){
        level = 'medium';
    }else if(hard.checked == true){
        level = 'hard';
    }
}

/**
 * 1 - calculate quiz duration
 * 2 - start count down
 * 3 - stop the quiz and display score when time is over
 */
var countDown = () => {
    let scoreMsg = document.createElement('p');
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (String(seconds).length === 1) {
        seconds = '0' + seconds;
    }

    timer.innerHTML = ` ${minutes} :  ${seconds} `;
    time--;

    if (time < 0) {
        stopCountDown();
        takeQuizAgainBtn.style.display = "block";
        submitAnswerBtn.style.display = "none";
        let score = correctScore / totalQuestions;
        scoreMsg.textContent = `Thank you ${userName} for taking the exam, your score is ${score}`;
        alert.innerHTML = "";
        alert.appendChild(scoreMsg);
    }
};

function stopCountDown() {
    clearInterval(intervalId);
}

/**
 * save user's data
 */
function filInUserInfo() {
    userName = document.getElementById('user-name').value;
    enteredNumberOfQuestions = document.getElementById('number-of-questions').value;
}

/**
 * create html element to display the quiz category
 */
function displayCategory(data) {
    category = document.getElementById('category');
    let ctg = document.createElement('span');
    ctg.classList.add('category');
    ctg.textContent = data.category;
    category.appendChild(ctg);
}
/** 
 * Note: The below function is added by the Tutor while supporting in resolving a bug (strings contain special charactors when displayed)
*/
function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

/**
 * create new elements to display the loaded question and it's related answers
 */
function DisplayQuestionAndAnswers(data) {
    question = document.getElementById('question');
    let ques = document.createElement("h4");
    let incorrectAnswer = data.incorrect_answers;
    let answersList = incorrectAnswer;

    submitAnswerBtn.disabled = false;

    correctAnswer = data.correct_answer;
    answersList.splice(Math.floor(Math.random() * 4), 0, correctAnswer);

    ques.textContent =  htmlDecode(data.question);
    question.appendChild(ques);

    answersList.forEach((answer) => {
        let paragraph = document.createElement("p");
        let span = document.createElement("span");
        span.textContent = htmlDecode(answer);
        paragraph.appendChild(span);
        answers.appendChild(paragraph);
    });

    selectAnswer();
}

/**
 * increase either the correct-answer-counter or wrong-answer-counter each time a question is being answered.
 * alert user with a message if no answer is selected.
 */
function checkAnswer() {
    alert.innerHTML = "";
    let message = document.createElement('p');
    if (answers.getElementsByClassName('selected')[0]) {
        let allAnswers = answers.getElementsByClassName('selected')[0];
        let selectedAnswer = allAnswers.getElementsByTagName('span')[0].textContent;
        submitAnswerBtn.disabled = true;
        if (allAnswers) {
            if (selectedAnswer == correctAnswer) {
                correctScore++;
            } else {
                incorrectScore++;
            }
            countCorrectAndIncorrectAnswers();
        }
    } else {
        message.textContent = 'Please select an answer!';
        alert.appendChild(message);
        submitAnswerBtn.disabled = false;
    }

}

/**
 * de-select other answers when one answer is selected
 * referenced here https://github.com/prabinmagar/quiz-app-using-js-with-open-trivia-DB-api/blob/master/script.js , and i make one change so the function suits my project's my logic 
 */
function selectAnswer() {

    answers.querySelectorAll('p').forEach((answer) => {
        answer.addEventListener('click', () => {
            if (answers.querySelector('.selected')) {
                const active = answers.querySelector('.selected');
                active.classList.remove('selected');
            }
            answer.classList.add('selected');
        });
    });
}

/**
 * display the user final score if all questions are answered, otherwise load the next question
 * The idea of the function below is referenced here https://github.com/prabinmagar/quiz-app-using-js-with-open-trivia-DB-api/blob/master/script.js , and I have been extended and changed the function according to the logic needs
 */
function countCorrectAndIncorrectAnswers() {
    let scoreMessage = document.createElement('p');
    askedQuestions++;
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
    correct.textContent = correctScore;
    incorrect.textContent = incorrectScore;
    if (askedQuestions == totalQuestions) {
        setTimeout(() => {}, 1000);
        takeQuizAgainBtn.style.display = "block";
        submitAnswerBtn.style.display = "none";
        let score = correctScore / totalQuestions;
        score = ((score) * 100);
        scoreMessage.textContent = `Thank you ${userName} for taking the exam, your score is ${score} %`;
        alert.appendChild(scoreMessage);
        stopCountDown();
    } else {
        setTimeout(() => {
            loadData();
        }, 300);
    }
}

/**
 * reset quiz-score and stop-watch
 * The idea of the function below is referenced here https://github.com/prabinmagar/quiz-app-using-js-with-open-trivia-DB-api/blob/master/script.js , and I have been extended and changed the function according to the logic needs
 */
function takeQuizAgain() {
    correctScore = askedQuestions = incorrectScore = 0;
    alert.innerHTML = "";
    takeQuizAgainBtn.style.display = "none";
    submitAnswerBtn.style.display = "block";
    submitAnswerBtn.disabled = false;
    totalQ.textContent = totalQuestions;
    questionCounter.textContent = askedQuestions;
    correct.textContent = correctScore;
    incorrect.textContent = incorrectScore;
    loadData();
    time = quizDuration * 60;
    intervalId = setInterval(countDown, 1000);
}