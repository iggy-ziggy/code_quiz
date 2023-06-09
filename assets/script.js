var startBtn = document.querySelector("#btn-start");
var stopBtn = document.querySelector("#btn-stop");

var timerEl = document.querySelector("#countdown");

var welcome = document.querySelector(".welcome");

var quiz = document.querySelector(".quiz");
quiz.style.display = "none"; //keeps sections hidden until called

var question = document.querySelector(".question");
var answerList = document.querySelector(".answerList");
var checkAnswer = document.querySelector("#checkAnswer");

var endQuiz = document.querySelector(".endQuiz");
endQuiz.style.display = "none"; //keeps sections hidden until called

var timeLeft = 60;

var questionArr = [
    {
        question: "What color is the sky?",
        choices: ["Brown", "Green", "Blue", "Yellow"],
        answer: "Blue"
    },
    {
        question: "What temp does water freeze at?",
        choices: ["0", "32", "100", "5"],
        answer: "32"
    },
    {
        question: "What is the opposite of up?",
        choices: ["Down", "Left", "Right", "Under"],
        answer: "Down"
    },
    {
        question: "What color is coal?",
        choices: ["Blue", "No color", "Red", "Black"],
        answer: "Black"
    },
    {
        question: "What happens when we die?",
        choices: ["Heaven", "Hell", "Void", "Unknown"],
        answer: "Unknown"
    }
];

startBtn.addEventListener("click", function () {
    console.log("I've been clicked!");
    countdown();
    startQuiz(index);
});

function countdown() {
    var timeLeft = 30;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.innerHTML = timeLeft + " seconds"
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.innerHTML = timeLeft + " second"
            timeLeft--;
        } else {
            timerEl.innerHTML = "GAME OVER";
            clearInterval(timeInterval);
        }
    }, 1000);
}

var index = 0;
var score = 0;

function startQuiz(index) { //"fake" for loop, array index wasn't starting at 0
    answerList.innerHTML = "";
    welcome.style.display = "none";
    quiz.style.display = "block"; //makes hidden quiz visible
    question.innerHTML = questionArr[index].question; //retrieves question value
    var answerArr = questionArr[index].choices; //made another array out of question options
    answerArr.forEach(function (i) {
        var answerItem = document.createElement("li");
        answerItem.classList.add("answerStyle");
        answerItem.innerHTML = i;
        answerList.append(answerItem) //appends answer to list
        console.log(answerItem);
         //trying to add style to list items as they're generated - start here next time
        answerItem.addEventListener("click", function () {
            var clickedOn = answerItem.innerHTML; //targets which item was clicked
            if (clickedOn === questionArr[index].answer) {
                console.log('Right!'); //need to add visible response for right and wrong answers
                checkAnswer.innerHTML = "Correct!";
            } else {
                console.log("Wrong!");
                checkAnswer.innerHTML = "Incorrect!";
            }
            if(index >= questionArr.length - 1) {
                console.log("game over");
                index = 0;
                quiz.style.display = "none";
                endQuiz.style.display = "block";
            } else {
                index++;
                startQuiz(index);
            }
        })
    })
}
//To Do: 
//store score
//create HTML element for displaying score
//
//decrement time on wrong answer
//
//game over function for getting rid of questions