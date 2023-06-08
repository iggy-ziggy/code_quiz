var startBtn = document.querySelector("#btn-start");
var stopBtn = document.querySelector("#btn-stop");
var timerEl = document.querySelector("#countdown");
var welcome = document.querySelector(".welcome");
var quiz = document.querySelector(".quiz");
quiz.style.display = "none"; //keeps sections hidden until called
var question = document.querySelector(".question");
var answerList = document.querySelector(".answerList");
var endQuiz = document.querySelector(".endQuiz");
endQuiz.style.display = "none"; //keeps sections hidden until called

var questionArr = [
    {
        question: "What color is the sky?",
        choices: ["A. Brown", "B. Green", "C. Blue", "D. Yellow"],
        answer: "C. Blue"
    },
    {
        question: "What temp does water freeze at?",
        choices: ["A. 0", "B. 32", "C. 100", "D. 5"],
        answer: "B. 32"
    },
    {
        question: "What is the opposite of up?",
        choices: ["A. down", "B. left", "C. right", "D. under"],
        answer: "A. down"
    },
    {
        question: "What color is coal?",
        choices: ["A. blue", "B. no color", "C. red", "D. black"],
        answer: "D. black"
    },
    {
        question: "What happens when we die?",
        choices: ["A. Heaven", "B. Hell", "C. Void", "D. unknown"],
        answer: "D. unknown"
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
        answerItem.innerHTML = i;
        answerList.append(answerItem) //appends answer to list
        answerItem.addEventListener("click", function () {
            var clickedOn = answerItem.innerHTML; //targets which item was clicked
            if (clickedOn === questionArr[index].answer) {
                console.log('Right!');
            } else {
                console.log("Wrong!");
            }
            if(index >= questionArr.length - 1) {
                console.log("quiz over");
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