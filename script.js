// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is the capital of Spain?",
        imgSrc : "assets/src/img/spain.png",
        choiceA : "Vienna",
        choiceB : "Paris",
        choiceC : "Madrid",
        correct : "C"
    },{
        question : "What is the capital of Kenya?",
        imgSrc : "assets/src/img/kenya.png",
        choiceA : "Nairobi",
        choiceB : "Pekin",
        choiceC : "Marseille",
        correct : "A"
    },{
        question : "What is the capital of United States?",
        imgSrc : "assets/src/img/usa.png",
        choiceA : "Berlin",
        choiceB : "Washington DC",
        choiceC : "Kinshasa",
        correct : "B"
    },{
        question : "What is the capital of Tanzania?",
        imgSrc : "assets/src/img/tanzania.png",
        choiceA : "Daar Salam",
        choiceB : "Hong Kong",
        choiceC : "Lille",
        correct : "A"
    },{
        question : "What is the captal of United Kingdom?",
        imgSrc : "assets/src/img/uk.png",
        choiceA : "Washington DC",
        choiceB : "London",
        choiceC : "Kivu",
        correct : "B"
    },{
        question : "What is the captal of Norway?",
        imgSrc : "assets/src/img/norway.png",
        choiceA : "Kinshasa",
        choiceB : "Kassel",
        choiceC : "Oslo",
        correct : "C"

    },{
        question : "What is the captal of Finland?",
        imgSrc : "assets/src/img/finland.png",
        choiceA : "Buenos Aires",
        choiceB : "Helsinki",
        choiceC : "Lima",
        correct : "B"

    },{
        question : "What is the captal of Democratic Republic Of Congo?",
        imgSrc : "assets/src/img/drc.png",
        choiceA : "Kinshasa",
        choiceB : "Kassel",
        choiceC : "Oslo",
        correct : "A"

    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 5; // 5s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "assets/src/favicons/perfect.png" :
              (scorePerCent >= 60) ? "assets/src/favicons/smile.png" :
              (scorePerCent >= 40) ? "assets/src/favicons/calm.png" :
              (scorePerCent >= 20) ? "assets/src/favicons/meeh.png" :
              "assets/src/favicons/sad.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















