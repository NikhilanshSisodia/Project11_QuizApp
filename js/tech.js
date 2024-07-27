const questions = [
    {
        question: 'Question 1: What is fullform of RAM?',
        answers: [
            {   text: 'Read Access Memory', correct: false  },
            {   text: 'Random Audit Modifier', correct: false  },
            {   text: 'Random Access Memory', correct: true  },
            {   text: 'Read Audit Modifier', correct: false  },
        ]
    },
    {
        question: 'Question 2: What does "HTTP" stand for?',
        answers: [
            {   text: 'HyperText Transfer Protocol', correct: true  },
            {   text: 'HyperText Transmission Protocol', correct: false  },
            {   text: 'HighText Transfer Protocol', correct: false  },
            {   text: 'HyperText Transmission Process', correct: false  },
        ]
    },
    {
        question: 'Question 3: What is the main function of an operating system?',
        answers: [
            {   text: 'To compile code', correct: false  },
            {   text: 'To manage hardware and software resources', correct: true  },
            {   text: 'To design websites', correct: false  },
            {   text: 'To create graphics', correct: false  },
        ]
    },
    {
        question: 'Question 4: What is the most common programming language for web development?',
        answers: [
            {   text: 'Python', correct: false  },
            {   text: 'Java', correct: false  },
            {   text: 'HTML', correct: false  },
            {   text: 'JavaScript', correct: true  },
        ]
    },
    {
        question: 'Question 5: What does "Wi-Fi" stand for?',
        answers: [
            {   text: 'Wireless Fidelity', correct: true  },
            {   text: 'Wireless Finder', correct: false  },
            {   text: 'Wireless Fiber', correct: false  },
            {   text: 'Wide Fidelity', correct: false  },
        ]
    },
];

const questionElement = document.querySelector('#question');
const answersButtons = document.querySelector('#answere-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answersButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswere)
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answersButtons.firstChild){
        answersButtons.removeChild(answersButtons.firstChild);
    } 
}

function selectAnswere(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answersButtons.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = '<a href="../index.html">Play Again</a>';
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();