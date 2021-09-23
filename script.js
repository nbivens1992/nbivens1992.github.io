const startButton=document.getElementById('start-btn')
const nextButton=document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click',() =>  {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=>Math.random()-.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
``
function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex+1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which hand hygiene practice drys out yours hands the least?',
        answers: [
            {text: 'Alcohol based hand rubs', correct: true},
            {text: 'Hand washing with soap', correct: false}
        ]
    },
    {
        question: 'What is the proper WHO formula iso-propyle concentration?',
        answers: [
            {text: '75%', correct: true},
            {text: '65%', correct: false},
            {text: '70%', correct: false},
            {text: '80%', correct: false}
        ]
    },
    {
        question: 'When treating a patient, which statement best describes when you are you supposed to use hand hygiene',
        answers: [
            {text: 'In between patients', correct: false},
            {text: 'Before contact and after patient contact', correct: true},
            {text: 'After patient contact', correct: false},
            {text: 'When your hands are soiled', correct: false},
        ]
    },
    {
        question: 'Is ABHR more effective than hand soap at disinfecting hands',
        answers: [
            {text: 'Yes, except for when hands are soiled', correct: true},
            {text: 'Yes, in all instances', correct: false},
            {text: 'No, Handwashing is more effective', correct: false},
            {text: 'No, bleach is the most effective way to disinfect hands', correct: false},
        ]
    },
    {
        question: 'Do you want to catch these hands?',
        answers: [
            {text: 'Yes', correct: true},
            {text: 'No', correct: false}
        ]
    },
    
]