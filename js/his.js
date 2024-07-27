const questions = [
    {
        question: 'Question 1: Who was the first President of the United States?',
        answers: [
            { text: 'John Adams', correct: false },
            { text: 'Thomas Jefferson', correct: false },
            { text: 'George Washington', correct: true },
            { text: 'James Madison', correct: false },
        ]
    },
    {
        question: 'Question 2: What was the primary cause of World War I?',
        answers: [
            { text: 'The assassination of Archduke Franz Ferdinand', correct: true },
            { text: 'The invasion of Poland', correct: false },
            { text: 'The Treaty of Versailles', correct: false },
            { text: 'The bombing of Pearl Harbor', correct: false },
        ]
    },
    {
        question: 'Question 3: Who was the leader of the Soviet Union during World War II?',
        answers: [
            { text: 'Vladimir Lenin', correct: false },
            { text: 'Joseph Stalin', correct: true },
            { text: 'Nikita Khrushchev', correct: false },
            { text: 'Leonid Brezhnev', correct: false },
        ]
    },
    {
        question: 'Question 4: What was the ancient Egyptian writing system called?',
        answers: [
            { text: 'Cuneiform', correct: false },
            { text: 'Hieroglyphics', correct: true },
            { text: 'Alphabet', correct: false },
            { text: 'Runes', correct: false },
        ]
    },
    {
        question: 'Question 5: Who was known as the "Iron Lady"?',
        answers: [
            { text: 'Angela Merkel', correct: false },
            { text: 'Indira Gandhi', correct: false },
            { text: 'Margaret Thatcher', correct: true },
            { text: 'Golda Meir', correct: false },
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