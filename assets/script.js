//buttons
var startBtn = document.querySelector("#btn-start");
var submitBtn = document.querySelector(".submitBtn");
var scoreBtn = document.querySelector(".scoreBtn");
//timer, high score, and welcome message
var timerEl = document.querySelector("#countdown");
timerEl.style.display = "none";
var displayScore = document.querySelector("#displayScore");
displayScore.style.display = "none";
var highScoreList = document.querySelector("highScoreList");
// highScoreList.style.display = "none";
var initialInput = document.querySelector("initialInput");
var welcome = document.querySelector(".welcome");
//quiz body
var quiz = document.querySelector(".quiz");
quiz.style.display = "none"; //keeps sections hidden until called

var question = document.querySelector(".question");
var answerList = document.querySelector(".answerList");
var checkAnswer = document.querySelector("#checkAnswer");

var endScore = document.querySelector("endScore");
var endQuiz = document.querySelector(".endQuiz");
endQuiz.style.display = "none"; //keeps sections hidden until called
var initialForm = document.querySelector(".initialForm");
initialForm.style.display = "none";
var initialMsg = document.querySelector(".initialMsg");
var initialInput = document.querySelector(".initialInput");
var finalScoreEl = document.querySelector(".finalScore");

// var timeLeft = 60;

var questionArr = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["script", "scripting", "js", "javascript"],
        answer: "script"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["numbers", "booleans", "inputs", "strings"],
        answer: "inputs"
    },
    {
        question: "The first index of an array is:",
        choices: ["0", "1", "null", "undefined"],
        answer: "0"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["submit", "mouseover", "click", "mouseclick"],
        answer: "click"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["parentheses", "quotation marks", "curly brackets", "colons"],
        answer: "quotation marks"
    },
];

startBtn.addEventListener("click", function() {
    console.log("I've been clicked!");
    countdown();
    startQuiz(index);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    storeScore();
    // console.log(initialInput.value);
    console.log("I'm submitted!");
});

scoreBtn.addEventListener("click", function() {
    getScores();
    console.log("Here are your scores!");
})

//event listener for high score button

function countdown() {
    var timeLeft = 30;
        timerEl.textContent = timeLeft;

    var startTimer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(startTimer);
        }
    },1000);
    // var timeLeft = 60;
    // var timeInterval = setInterval(function () {
    //     if (timeLeft > 1) {
    //         timerEl.innerHTML = timeLeft + " seconds"
    //         timeLeft--;
    //     } else if (timeLeft === 1) {
    //         timerEl.innerHTML = timeLeft + " second"
    //         timeLeft--;
    //     } else {
    //         timerEl.innerHTML = "GAME OVER";
    //         clearInterval(timeInterval);
    //     }
    // }, 1000);
}

var index = 0;
var score = [];
var initials = [];

function startQuiz(index) { //"fake" for loop, array index wasn't starting at 0
    initialForm.style.display = "none";
    answerList.innerHTML = "";
    welcome.style.display = "none";
    timerEl.style.display = "block";
    quiz.style.display = "block"; //makes hidden quiz visible
    question.innerHTML = questionArr[index].question; //retrieves question value
    var answerArr = questionArr[index].choices; //made another array out of question options
    answerArr.forEach(function (i) {
        var answerItem = document.createElement("li");
        answerItem.classList.add("answerStyle");
        answerItem.innerHTML = i;
        answerList.append(answerItem); //appends answer to list
        console.log(answerItem);
        answerItem.addEventListener("click", function () {
            var clickedOn = answerItem.innerHTML; //targets which item was clicked
            if (clickedOn === questionArr[index].answer) {
                console.log('Right!'); //need to add visible response for right and wrong answers
                checkAnswer.innerHTML = "Correct!";
                score++;
                // console.log(score);
            } else {
                console.log("Wrong!");
                checkAnswer.innerHTML = "Incorrect!";
                // timeLeft -= 5; //trying to decrement timer - not working yet
                // timerEl.textContent = timeLeft;
            }
            if(index >= questionArr.length - 1) {
                console.log("game over");
                index = 0;
                timerEl.style.display = "none";
                quiz.style.display = "none";
                endQuiz.style.display = "block";
                checkAnswer.style.display = "none";
                scoreCard();
            } else {
                index++;
                startQuiz(index);
            }
            // console.log("Current score is " + score);
        })
    })
    
}
// console.log(score);
// function gameOver() {
    // timerEl.style.display = "none";
// }


function scoreCard() {//enter initials
    console.log("Your score is " + score);
    
    if (score > 0) {
        initialForm.style.display = "block";
        // initialMsg.textContent = "Your final score is " + score + "!";
        finalScoreEl.textContent = score;
    } else {
        alert("Please try again!");
    }
};

function storeScore() {//store score and initials
    initialForm.style.display = "none";
    
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: score
    };

    console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    getScores();
};

// function getScore() {//get score and initials, print to page

// };

function getScores() {

    initialForm.style.display = "none";
    displayScore.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check local storage
    if (savedHighScores === null) {
        return;
    }

    var storedHighScores = JSON.parse(savedHighScores);

    for (i = 0; i < storedHighScores.length; i++) {
        var newHighScore = document.createElement("li");
        newHighScore.textContent = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        scoreList.append(newHighScore);
    }
}

// scoreCard();
//To Do: 
//retrieve score
//
//decrement time on wrong answer!!!
//
//function to retrieve score and initials and print to page