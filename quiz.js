//selecting all elements
const start= document.getElementById("start");
const quiz= document.getElementById("quiz");
const question= document.getElementById("question");
const qImg= document.getElementById("qImg");
const choiceA= document.getElementById("A");
const choiceB= document.getElementById("B");
const choiceC= document.getElementById("C");
const counter= document.getElementById("counter");
const timeGauge= document.getElementById("timeGauge");
const progress= document.getElementById("progress");
const scoreDiv= document.getElementById("scoreContainer");

//forming questions
let questions=[
	{
		question : "In HTML, colors can be specified using HSL value, which means",
        imgSrc : "img/html.png",
        choiceA : "Hue, Saturation, Light",
        choiceB : "High, Static, Low",
        choiceC : "High, Stable, Low",
        correct : "A"
	},
	{
		question : "A tag used as an alternative to make text bold is",
        imgSrc : "img/html.png",
        choiceA : "bold tag",
        choiceB : "double tag",
        choiceC : "strong tag",
        correct : "C"
	},
	{
		question : "Defining a special style for special table, added attribute should be of",
        imgSrc : "img/html.png",
        choiceA : "class tag",
        choiceB : "padding tag",
        choiceC : "id tag",
        correct : "C"
	},
	{
		question : "Element <em> of HTML defines",
        imgSrc : "img/html.png",
        choiceA : "Exponent mode text",
        choiceB : "Emphasized text",
        choiceC : "Empirical text",
        correct : "B"
	},
	{
		question : "Data type of an array is",
        imgSrc : "img/js.png",
        choiceA : "int",
        choiceB : "object",
        choiceC : "NaN",
        correct : "B"
	},
	{
		question: "XHTML elements should always be declared in",
		imgSrc:"img/html.png",
		choiceA:"Uppercase",
		choiceB:"Lowercase",
		choiceC:"Sentence case",
		correct:"B"
	},
	{
		question: "In order to define a style for special type of elements, attribute to be added is known to be",
		imgSrc:"img/html.png",
		choiceA: "class tag",
		choiceB:"body tag",
		choiceC:"id tag",
		correct:"A"
	},
	{
		question: "For best practice while identifying variables, use",
		imgSrc:"img/js.png",
		choiceA: "Lower case",
		choiceB:"Camelcase",
		choiceC:"Proper case",
		correct:"B"
	},
	{
		question: "Test() method of regular expression, is a",
		imgSrc:"img/js.png",
		choiceA: "Comparison method",
		choiceB:"Conversion method",
		choiceC:"Boolean method",
		correct:"C"
	},
	{
		question: "Data type of NaN is a",
		imgSrc:"img/js.png",
		choiceA: "Number",
		choiceB:"Undefined",
		choiceC:"Character",
		correct:"A"
	}

]
 // creating variables
 
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//display the questions
function displayQuestion()
{
	let q = questions[runningQuestion];
	question.innerHTML= "<p>" + q.question + "</p>";
	qImg.innerHTML="<img src="+q.imgSrc+">";
	choiceA.innerHTML=q.choiceA;
	choiceB.innerHTML=q.choiceB;
	choiceC.innerHTML=q.choiceC;
}

start.addEventListener("click",startQuiz);

//function to start quiz

function startQuiz()
{
	start.style.display="none";
	displayQuestion();
	quiz.style.display="block";
	displayProgress();
	displayCounter();
	TIMER = setInterval(displayCounter, 1000); //time in ms
}

//function to display progress
function displayProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

//function to display counter
function displayCounter()
{
    if(count <= questionTime)
	{
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }
	else
	{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            displayQuestion();
        }
		else{
            // end the quiz and show the score
            clearInterval(TIMER);
            displayScore();
        }
    }
}

//function to check answerIsWrong

function checkAnswer(answer)
{
	if(answer == questions[runningQuestion].correct){
		score++;
		answerIsCorrect();
	}
	else{
		answerIsWrong();
	}
	count=0;
	if(runningQuestion< lastQuestion){
		runningQuestion++;
		displayQuestion();
	}
	else{
		// end of the quiz, display score
		clearInterval(TIMER);
		displayScore();
	}
}

// correct answer
function answerIsCorrect()
{
	document.getElementById(runningQuestion).style.background="green";
}

// wrong answer
function answerIsWrong()
{
	document.getElementById(runningQuestion).style.background="red";
}

//function to display score
function displayScore()
{
	scoreDiv.style.display="block";
	
	//calculate % score
	const percentScore= Math.round(100*score/questions.length);
	
	// choose the image based on the % score
    let img = (percentScore >= 80) ? "img/5.png" :
              (percentScore >= 60) ? "img/4.png" :
              (percentScore >= 40) ? "img/3.png" :
              (percentScore >= 20) ? "img/2.png" :
              "img/1.png";
			  
	scoreDiv.innerHTML="<img src="+ img + ">";
	scoreDiv.innerHTML+= "<p>" + percentScore + "%</p>";
}