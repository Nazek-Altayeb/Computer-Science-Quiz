[Click this link to view the Website.](https://nazek-altayeb.github.io/Computer-Science-Quiz/)

This site is for people who come with computer science background and like doing challenges that examine their theory knowledge in this field. 
A few instructions are presented aside with a fill-in form where the user type in his/her name, a mount of questions and choose a level of difficulty before starting the quiz.

![main-page](./assets/images/quiz-project-picture.png)

# User Experience
## Site owner goals
*As a site owner, my goal is to :* 
* Develop responsive and easy to use one-page website.
* Express what is required to proceed with the quiz in short and simple sentences. 
* Provide user with options (ex: difficulty level, number of questions).
* Accumolate both correct and incorrect answers, and display the score.
* set quiz timer, freeze the quiz form and prevent the quiz taker from answering the questions when time is over.

## User Stories
*As a user visits the site for the first time, i will be seeking for:*
* a site design that looks attarctive and encourages me taking the quiz.
* a form comes with Choices to take before taking the exam.
* a clearly mentioned rules and process, and the quiz form is easy to use.

*As a user who already visited the site, i will be seeking for:*
* a different chalenging questions.
* ability to see the highest score for different users at the same level.

## Design
* The quiz area takes 70% of the page, centered in the middle of the page. 
* UX is easy to understand and use.  

## colors
Milk White, white Smoke and Neutral Green are used as three basic colors for the quiz area, it's shadow and the background.
the rest of the page remained white.

## Typography 
Basicly, Poppins is the font used and Sans-serif is the back-up font if Poppins fails to load.

# Features 
## Existing features

### Fill in quiz form
User will be asked to type in the following:
- Name,
- A number of how many question would he/she like to take in the quiz,
- Choose a level of difficulty,
 The form will be disabled once the user click on 'start quiz' button.

### Load quiz-data from API
- Every question and it's related answers: All are load from the api: https://opentdb.com/api_config.php,
- The number of question is determined by the input entered in the start quiz form.

### Stop Watch
Approximately a minute is given for each question to be answered, submiting answers will be disabled even if the user didn't finish.

### Score accumulation
Scores are displayed in two cases, after user finishes answering all given questions, or when time is over.

### Display alert messages
- Incase user click on 'Submit answer' button without selecting an answer, an alert message will be displayed asking the user to select answer first.
- In case the quiz is finished, the score points will be displayed

### Display score
- Either when user finish answering all questions Or when time is over, the score will be displayed.

## Future-planned features
* Display the highst score for the same level of difficulty.
* specify fixed amount of time for every question.
* Extend the quiz form options to select the answer type (True / False) besides the multiple options that already exist.

# Technologies
## Languages 
* [HTML5](https://en.wikipedia.org/wiki/HTML5)
  * Symantic elements of the HTML5 are used to build the website.
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
  * Some useful css rules has been added to fulfil the intended appreance of the page and to guarantee responsiveness feature 
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
  * Dynamic interaction between the client and browser is done within the js file.

## Frameworks, Libraries and tools

1. [Bootstrap 5:](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
    - Bootstrap was used to assist with the responsiveness and styling of the website.
1. [Font Awesome:](https://fontawesome.com/)
    - Font Awesome was used on all pages throughout the website to add icons for aesthetic and UX purposes.
1. [GitHub:](https://github.com/)
    - GitHub is used to store the projects code after being pushed from Git.


# Credit
## Code
- Three functions in script.js has been referenced at [https://github.com/prabinmagar/quiz-app-using-js-with-open-trivia-DB-api]
  - The three functions have been either extended or changed to suit my project logic.
  - Comments have been added to each function.

##  Content
- [Open TRIVIA Api:](https://opentdb.com/api_config.php) 
    - Data (questions and answers) have been loaded from Open TRAVIA as json data. 

# Testing

## First Test scenario
- First, user fill in his/her (Name , amount of questions, difficulty level)
- Press on 'start quiz' button
- Second, the quiz area is displayed containing (Timer , Question counter, a question with four answer-options, two counters to accumulate the correct and incorrect answers).
- Third, once the user select an answer, he should click on 'submit answer', then one of the counters (correct answer, incorrect answer) will be increased by 1.
- when user answers all question with the given amount of time, the final score is displayed.
- Finally, the user is given a choice to take the quiz again.

## Second Test scenario
- First, user fill in his/her (Name , amount of questions, difficulty level)
- Press on 'start quiz' button
- Second, the quiz area is displayed containing (Timer , Question counter, a question with four answer-options, two counters to accumulate the correct and incorrect answers).
- Third, once the user select an answer, he should click on 'submit answer', then one of the counters (correct answer, incorrect answer) will be increased by 1.
- in case time is over, the question area is freezed (no way to submit more answers) and the final score is displayed.
- Finally, the user is given a choice to take the quiz again.

## Validation
1. W3C Markup Validator ( [Results](./assets/documents/w3c-html-result.png) )
    - The page has passed the validation test with no error.

1. W3C CSS Validator ( [Results](./assets/documents/w3c-html-result.png) )
    - The page has passed the validation test with no error.


## Performance
* [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/): [Results](./assets/documents/lighthouse-result.png)
    -  Lighthouse is used to evaluate the speed and perfomance of the quiz-project site

## Responsiveness
* The responsive feature have been tested for different devices with no failure. 
* Devices:
  * iPhone SE
  * iPad Air
  * iPad mini
  * iPhone XR
  * iPhone 12 Pro
  * Galaxy Fold
  * Surface Pro 7


# Fixed bugs
1. Timer keep in counting down even if the user finishes answering all questions (invoke the timer function when user click on start quiz)
1. If no answer is selected, the alert msg 'Please select an answer' is not displayed (elemnt that hold the alert message was not appended to it's parent) 
1. Display the instruction card and the fill-in form card below each others (problem was solved by re-ordering the two bootstrap classes that are used)


# Deployment

## GitHub Pages

The project was deployed to GitHub Pages using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/)
2. At the top of the Repository (not top of page), locate the "Settings" Button on the menu.
    - Alternatively Click [Here](https://raw.githubusercontent.com/) for a GIF demonstrating the process starting from Step 2.
3. Scroll down the Settings page until you locate the "GitHub Pages" Section.
4. Under "Source", click the dropdown called "None" and select "Main Branch".
5. The page will automatically refresh.
6. Scroll back down through the page to locate the now published site [link](https://github.com) in the "GitHub Pages" section.

## Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/Nazek-Altayeb/Computer-Science-Quiz)
2. Under the repository name, click "Clone or download".
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

# Acknowledgement

-   My Mentor **Reuben Ferrante** for continuous helpful feedback.

-   Tutors support at Code Institute for their support.