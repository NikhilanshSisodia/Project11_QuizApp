const questions = [
    {
        question: 'Question 1: What is the chemical symbol for water?',
        answers: [
            { text: 'O2', correct: false },
            { text: 'H2O', correct: true },
            { text: 'CO2', correct: false },
            { text: 'H2', correct: false },
        ]
    },
    {
        question: 'Question 2: Who developed the theory of general relativity?',
        answers: [
            { text: 'Isaac Newton', correct: false },
            { text: 'Albert Einstein', correct: true },
            { text: 'Galileo Galilei', correct: false },
            { text: 'Nikola Tesla', correct: false },
        ]
    },
    {
        question: 'Question 3: What planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Venus', correct: false },
            { text: 'Saturn', correct: false },
        ]
    },
    {
        question: 'Question 4: What is the powerhouse of the cell?',
        answers: [
            { text: 'Nucleus', correct: false },
            { text: 'Ribosome', correct: false },
            { text: 'Mitochondria', correct: true },
            { text: 'Endoplasmic Reticulum', correct: false },
        ]
    },
    {
        question: 'Question 5: What gas do plants absorb from the atmosphere?',
        answers: [
            { text: 'Oxygen', correct: false },
            { text: 'Nitrogen', correct: false },
            { text: 'Carbon Dioxide', correct: true },
            { text: 'Hydrogen', correct: false },
        ]
    },
]


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