const questions = [
    {
        question: 'Question 1: Who won the 2023 Nobel Peace Prize?',
        answers: [
            { text: 'Abiy Ahmed', correct: false },
            { text: 'Malala Yousafzai', correct: false },
            { text: 'Maria Ressa', correct: false },
            { text: 'Narges Mohammadi', correct: true },
        ]
    },
    {
        question: 'Question 2: Which country recently rejoined UNESCO in 2023?',
        answers: [
            { text: 'United States', correct: true },
            { text: 'Russia', correct: false },
            { text: 'United Kingdom', correct: false },
            { text: 'China', correct: false },
        ]
    },
    {
        question: 'Question 3: What significant event took place at the COP28 summit in 2023?',
        answers: [
            { text: 'Agreement on carbon pricing', correct: false },
            { text: 'Commitment to net-zero emissions by 2050', correct: true },
            { text: 'Ban on single-use plastics', correct: false },
            { text: 'Creation of a new climate fund', correct: false },
        ]
    },
    {
        question: 'Question 4: Which country launched the JUICE mission to explore Jupiter’s moons in 2023?',
        answers: [
            { text: 'USA', correct: false },
            { text: 'China', correct: false },
            { text: 'Russia', correct: false },
            { text: 'European Union', correct: true },
        ]
    },
    {
        question: 'Question 5: Who is the current Secretary-General of the United Nations as of 2023?',
        answers: [
            { text: 'Ban Ki-moon', correct: false },
            { text: 'Kofi Annan', correct: false },
            { text: 'Antonio Guterres', correct: true },
            { text: 'Boutros Boutros-Ghali', correct: false },
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