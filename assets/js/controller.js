import { MIN_USER_LENGTH as userLength } from "./config.js";
import  {TOTAL_PROF_QUUESTIONS as totProfQuestions} from "./config.js";
import  {TOTAL_AMATEUR_QUESTIONS as totAmateurQuestions} from "./config.js";
import  {TOTAL_ANSWER_OPTIONS as totOptions} from "./config.js";

import { professionalData } from "./model.js";
import { amateurData } from "./model.js";

// Define the variables for DOM elements
const quizLevel = document.querySelectorAll(".quiz-btn");

const displayUsernameModal = function () {
    //display the initial question from the amateur level
    getAndDisplayQuiz();
    // const quizItem = getQuestionToDisplay();
    // console.log(quizItem);
    // displayQuestion(quizItem[0],quizItem[1]);
    const player = document.getElementById("player");
    const modal = document.getElementById("userNameModal");
    if (player.textContent === '?') {
        // call function to display modal and request player name
        modal.style.display = "block";
    }
}
document.addEventListener("DOMContentLoaded", displayUsernameModal);



const validateAndSaveUser = function () {
    let username = document.getElementById("username").value;
    const modal = document.getElementById("userNameModal");
    username = username.length > 0 ? username.trim() : username;
    const player = document.getElementById("player");
    if (username.length === 0) {
        if (confirm("Confirm exiting without a username, in this case your name will be 'Guest'")) {
            player.textContent = "Guest";
            modal.style.display = 'none';
        };
    } else if (username.length < userLength) {
        alert(`Your username must be ${userLength} characters and longer`);
    } else {
        modal.style.display = 'none';
        player.textContent = username;
    }
}
const usernameCloseBtn = document.querySelector(".username-close");
const usernameCreateBtn = document.querySelector("#create-user-button");

usernameCloseBtn.addEventListener('click', validateAndSaveUser);
usernameCreateBtn.addEventListener('click', validateAndSaveUser);

/**
 * Event listener for selection of the quiz level. Loop through the buttons for the quiz level, remove the class for the active button
 * on all buttons and insert the class on the clicked quiz level
 */
 const changeQuizLevel = function (event) {
    //  arrow function ideas and forEach obtained from my JavaScript lessons at Udemy.com
    quizLevel.forEach(btn => btn.classList.remove('active-quiz-level'));
    event.target.classList.add('active-quiz-level');
    getAndDisplayQuiz();
  };
 quizLevel.forEach(btn => btn.addEventListener('click', changeQuizLevel));

 /**
  * 
  * @param {the level of the quiz} quizLevel 
  * @param {the question index to display} questionId 
  * function that takes a question and its options and displays to the DOM
  */
const displayQuestion = function (quizLevel, questionId){
    //question ID is the index of the question in the array of questions

    const quiz = quizLevel === "professional"?professionalData[questionId]: amateurData[questionId];
    document.getElementById("question").textContent = quiz.question;
    for(let i = 1; i <= totOptions; i++){
        document.getElementById(`option${i}`).textContent = quiz[`option${i}`];
    }
}

/**
 * Function checks which level the player is engaged in, picks a random question among the ones that have used property false
 * function returns the id of the question and the quiz level
 */
const getQuestionToDisplay = function (){
    // check the quiz level (that is which of the quiz level has the active-quiz-level class set)
    let levelSelected;
    for(let quizlevel of quizLevel ) {
        if(quizlevel.classList.contains('active-quiz-level')){
            levelSelected = quizlevel.dataset.type;
        }
    }
    const unusedQuiz = levelSelected === "professional"? professionalData.filter(data => !data.used): amateurData.filter(data => !data.used);
    const quizId = Math.floor(Math.random() * unusedQuiz.length) ;
    return [levelSelected, unusedQuiz[quizId].id];
}

/**
 * A function to get and display a quiz item
 */
const getAndDisplayQuiz = function (){
    const quizItem = getQuestionToDisplay();
    displayQuestion(quizItem[0],quizItem[1]);
}