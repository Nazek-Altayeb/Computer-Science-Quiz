## Project Objective
People with Computer science background may examine their knowledge with this challenging quiz, a quiz where a specified number of questions are displayed according to a level of difficulty that is determinated by the competitor himself/herself.

## User Experience
### Site owner goals
*As a site owner, my goal is to :* 
* Develop responsive and easy to use one-page website.
* Express what is required to proceed with the quiz in short and simple sentences. 
* Provide user with options (ex: difficulty level, number of questions)
* Accumolate both correct and incorrect answers, and display the score.
* set quiz timer, freeze the quiz form and prevent the quiz taker from answering the questions when time is over.

### User Stories
*As a user visits the site for the first time, i will be seeking for:*
* a site design that looks attarctive and encourages me taking the quiz.
* a form comes with Choices to take before taking the exam.
* a clearly mentioned rules and process, and the quiz form is easy to use.

*As a user who already visited the site, i will be seeking for:*
* a different chalenging questions.
* ability to see the highest score for different users at the same level.

### Design
* The quiz area takes 70% of the page, centered in the middle of the page. 
* UX is easy to understand and use.  

### colors
The Granny Apple is the color used as a background for the quiz area,
the rest of the page remained white

### Typography 
Basicly, Poppins is the font used and Sans-serif is the back-up font if Poppins fails to load.

## Features 
### Quiz Form
start quiz form: user will be asked to type in his/her name and a number of how many question would he/she like to take in the quiz, this form is disabled once the user click on 'start quiz' button 

### Load Data From API
display question and related answers: All are load from the api: https://opentdb.com/api_config.php, the number of question is determined by the input entered in the start quiz form

### Stop Watch
stop watch : a minute is given for each question to be answered, submiting answers will be disabled even if the user didn't finish.

### Score accumulation 
display score : sores are displayed in two cases, after user finishes answering all given questions, or when time is over. 