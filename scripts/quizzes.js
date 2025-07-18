// Import
import { animalQuestions } from '../data/data.js';

// Initializations
let shuffledQuestions = [];
let currentQuestion = {};
let questionIndex = 0;

// Page Elements
const visualCtn = document.querySelector('#visual-ctn');
const hintsCtn = document.querySelector('#hints-ctn');
const quizForm = document.querySelector('form');

// Functions
function fisherYatesShuffle(arr) {
    let newArr = [...arr];

    for(let i = arr.length-1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i+1));

        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
}

function setupPage(question) {
    // Clear textbox, hints, reset answer icon
    document.querySelector('#text-box').value = '';
    hintsCtn.innerHTML = '';            

    // Set image/emoji
    visualCtn.innerText = question.visual;

    // create a button hiding each character of the answer in hiragana
    for(let char of question.answer) {
        const hint = document.createElement('button');
        hint.innerText = char;

        hint.addEventListener('click', (e) => {                    
            // Turn button text white on click
            e.target.classList.add('text-reveal');
        });

        // Add to hints container
        hintsCtn.appendChild(hint);
    }
}

// Shuffle deck, set question
shuffledQuestions = fisherYatesShuffle(animalQuestions);
currentQuestion = shuffledQuestions[questionIndex];

// Setup page on load
document.addEventListener('DOMContentLoaded', () => {
    setupPage(currentQuestion);
});

// Handle submission
quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const myAnswer = document.querySelector('#text-box').value;
    const answerIcon = document.querySelector('#answer-icon');

    if(myAnswer === currentQuestion.answer) {
        answerIcon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
        const progressBar = document.querySelector('#progress-bar');
        progressBar.classList.add('animate'); 
        
        // If answered last question
        if(questionIndex === shuffledQuestions.length - 1) {                    
            document.querySelector('#content').innerHTML = '<h1>Quiz Complete</h1><button id="return-btn"><a href="/index.html" target="_self">Return</a></button>';
            return;
        }                

        // Setup next page after 1 second
        const setupTimer = setTimeout(() => {
            answerIcon.innerHTML = '<i class="fa-regular fa-circle"></i>';
            questionIndex += 1;
            currentQuestion = shuffledQuestions[questionIndex];
            setupPage(currentQuestion)
            clearTimeout(setupTimer)
            progressBar.classList.remove('animate');
        }, 1000);
    } else {
        answerIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    }

})