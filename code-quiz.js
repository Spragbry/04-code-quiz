
window.onload = () => {
    let highScores = {}
    let initials = ""
    let timer = null
    let duration = 0
    let timeRemaining = 60
    let incorrectPenalty = 10
    const questionContainer = document.getElementById("question-container")
    console.log("question-container",questionContainer)
    const showQuestion = () => {
        questionContainer.style.display = "flex"
    }

    const hideQuestion = () => {
        questionContainer.style.display = "none"
    }
    
    const updateTimerText = () => {
        let timerText = document.getElementById("timer-clock")
        timerText.innerHTML = `Timer: ${timeRemaining}`
    }
        
    let index = 0

    let questions = [
        {
            id:"1",
            prompt: "What does CSS Stand for?",
            answer: "Cascading Style Sheets",
            options: ["Coding Software Services","Cool String Stuff","Cats Smell Seasoning","Cascading Style Sheets"]
        },
        {
            id:"2",
            prompt: "What does HTML stand for?",
            answer: "Hyper Text Markup Language",
            options: ["hyper text Module language","halarious text makes laughter","Hyper Text Markup Language","Hyper Text Makeup Language"]
        },
        {
            id:"3",
            prompt: "what does JS stand for?",
            answer: "Java Script",
            options: ["Joint Surgery","Java Script","Jeff Saturday","Java Splice"]
        },
        {
            id:"4",
            prompt: "A div makes what shape?",
            answer: "Box",
            options: ["Circle","Box","Diamond",]
        },
        {
            id:"5",
            prompt: "What is an Array?",
            answer: "A list",
            options: ["A list","A song","A band"]
        }
    ]
    let answers = {}

    const answerQuestion = (question,answer) => {
        answers[question.id] = {}
        answers[question.id].value = answer
        answers[question.id].correct = answer === question.answer 
    }
    
    const displayResult = (correct) => {
        const resultDiv = document.getElementById("answer-indicator")
        const correctElt = document.getElementById("correct-answer")
        const incorrectElt = document.getElementById("incorrect-answer")
        resultDiv.style.display = "flex"
        if (correct){
            correctElt.style.display = "flex"
            incorrectElt.style.display = "none"
        } else {
            duration += incorrectPenalty
            correctElt.style.display = "none"
            incorrectElt.style.display = "flex"
        }
    }

    const hideResult = () => {
        const resultDiv = document.getElementById("answer-indicator")
        resultDiv.style.display = "none"
    }
    
    
    const updateQuestion = () => {
        const question = questions[index]
        let questionText = document.getElementById("question-text")
        console.log("question text",questionText)
        console.log("question prompt",question.prompt)
        questionText.innerHTML = question.prompt
        const optionsDiv = document.getElementById("option-container")
        while(optionsDiv.firstChild){
            optionsDiv.removeChild(optionsDiv.firstChild)
        }
        const options = question.options
        options.forEach((option)=>{
            let button = document.createElement("button")
            button.innerHTML = option
            optionsDiv.appendChild(button)
            button.onclick = () => {
                answerQuestion(question,option)
                const correct = answers[question.id].correct
                displayResult(correct)
            }
        })
    }
 
    const showGameOver = () => {
        const gameOverElt = document.getElementById("game-over")
        gameOverElt.style.display = "flex"
    }

    const hideGameOver = () => {
        const gameOverElt = document.getElementById("game-over")
        gameOverElt.style.display = "none"
    }

    const setGameOver = () => {
        hideQuestion()
        hideResult()
        showGameOver()
    }

    const nextQuestion = () => {
        hideResult()
        if(index < questions.length - 1){
            index += 1
        } else {
            index = 0
            setGameOver()
        }
        updateQuestion()
    }

    const startQuiz = () => {
        hideGameOver()
        duration = 0
        showQuestion()
        timer = setInterval(()=>{
            duration += 1
            timeRemaining = 60 - duration
            if(timeRemaining <= 1){
                timeRemaining = 0
                clearInterval(timer)
                setGameOver()
            }
            updateTimerText()
        },1000)  
    }

    const updateHighScores = () => {
        const highScoresDiv = document.getElementById("high-scores")
        console.log("high-scoresDiv",highScoresDiv)
        while(highScoresDiv.firstChild){
            highScoresDiv.removeChild(highScoresDiv.firstChild)
        }
        Object.keys(highScores).forEach((key) => {
            let value = highScores[key]
            let score = value.score
            let initial = value.initials
            let displayText = `${initial}-${score}`
            let hsElt = document.createElement("h3")
            hsElt.innerHTML = displayText
            highScoresDiv.appendChild(hsElt)
        })
        console.log("high-scoresDiv",highScoresDiv)
        console.log("high scores",highScores)
    }

    console.log("document was loaded")
    hideQuestion()
    hideGameOver()
    hideResult()
    updateHighScores()
    let startButton = document.getElementById("startButton")
    updateQuestion()
    startButton.onclick = startQuiz
    let nextButton = document.getElementById("next-button")
    nextButton.onclick = nextQuestion
    const inputElement = document.getElementById("initials-input")
    inputElement.addEventListener("input",(e) => {
        initials = e.target.value
    })
    const submitButton = document.getElementById("submit-initials")
    submitButton.onclick = () => {
        let score = 0
        Object.keys(answers).forEach((key) => {
            let answer = answers[key]
            if(answer.correct){
                score += 1
            }
        })
        
        highScores[initials] = {}
        highScores[initials].score = score
        highScores[initials].initials = initials
        updateHighScores()
    }
}