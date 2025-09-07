// Quiz questions database
const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris has been the capital of France since 508 AD and is known as the 'City of Light'."
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars appears red due to iron oxide (rust) on its surface, giving it the distinctive reddish color."
    },
    {
        id: 3,
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean covers about 46% of Earth's water surface and contains more than half of the free water on Earth."
    },
    {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        explanation: "Leonardo da Vinci painted the Mona Lisa between 1503-1519. It's housed in the Louvre Museum in Paris."
    },
    {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Au comes from the Latin word 'aurum' meaning gold. It's element 79 on the periodic table."
    },
    {
        id: 6,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "The seven continents are: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
    },
    {
        id: 7,
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Tiger"],
        correctAnswer: 1,
        explanation: "Cheetahs can run up to 70 mph (112 km/h) in short bursts covering distances up to 1,600 ft."
    },
    {
        id: 8,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        explanation: "World War II ended in 1945 with Germany's surrender in May and Japan's surrender in September."
    },
    {
        id: 9,
        question: "What is the smallest country in the world?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correctAnswer: 2,
        explanation: "Vatican City is only 0.17 square miles (0.44 square kilometers) and has a population of around 800 people."
    },
    {
        id: 10,
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 2,
        explanation: "JavaScript runs in web browsers and is essential for creating interactive websites and web applications."
    },
    {
        id: 11,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: 2,
        explanation: "Diamond is the hardest natural substance, rating 10 on the Mohs hardness scale."
    },
    {
        id: 12,
        question: "Which country has the most time zones?",
        options: ["Russia", "United States", "China", "Australia"],
        correctAnswer: 0,
        explanation: "Russia spans 11 time zones, making it the country with the most time zones in the world."
    }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];
let answered = false;

// DOM elements
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const correctAnswer = document.getElementById('correctAnswer');
const explanation = document.getElementById('explanation');
const nextBtn = document.getElementById('nextBtn');
const scoreElement = document.getElementById('score');
const questionNumber = document.getElementById('questionNumber');
const currentQuestionElement = document.getElementById('current-question');
const progressBar = document.getElementById('progressBar');
const quizContainer = document.getElementById('quizContainer');
const resultsContainer = document.getElementById('resultsContainer');

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

function initializeQuiz() {
    // Shuffle questions and select 5 random ones
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    quizQuestions = shuffledQuestions.slice(0, 8);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    
    // Update UI
    updateScore();
    updateProgress();
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question text and number
    questionText.textContent = question.question;
    questionNumber.textContent = currentQuestionIndex + 1;
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    
    // Clear previous options and feedback
    optionsContainer.innerHTML = '';
    feedbackContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    answered = false;
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionElement);
    });
    
    updateProgress();
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Check if answer is correct
    const isCorrect = selectedIndex === question.correctAnswer;
    
    if (isCorrect) {
        score++;
        updateScore();
        options[selectedIndex].classList.add('correct');
        showFeedback(true, question);
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correctAnswer].classList.add('correct');
        showFeedback(false, question);
    }
    
    // Show next button after a brief delay
    setTimeout(() => {
        nextBtn.style.display = 'inline-block';
    }, 1000);
}

function showFeedback(isCorrect, question) {
    feedbackContainer.style.display = 'block';
    
    if (isCorrect) {
        feedbackMessage.textContent = '🎉 Correct! Well done!';
        feedbackMessage.className = 'feedback-message correct';
        correctAnswer.style.display = 'none';
    } else {
        feedbackMessage.textContent = '❌ Incorrect!';
        feedbackMessage.className = 'feedback-message incorrect';
        correctAnswer.textContent = `Correct answer: ${question.options[question.correctAnswer]}`;
        correctAnswer.style.display = 'block';
    }
    
    explanation.textContent = question.explanation;
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function updateScore() {
    scoreElement.textContent = score;
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    const finalScore = document.getElementById('finalScore');
    const finalTotal = document.getElementById('finalTotal');
    const scorePercentage = document.getElementById('scorePercentage');
    const scoreMessage = document.getElementById('scoreMessage');
    
    finalScore.textContent = score;
    finalTotal.textContent = quizQuestions.length;
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    scorePercentage.textContent = `${percentage}%`;
    
    // Set score message and styling based on performance
    let message, className;
    if (percentage === 100) {
        message = '🎉 Perfect! Outstanding work!';
        className = 'score-excellent';
    } else if (percentage >= 80) {
        message = '👏 Excellent! Great job!';
        className = 'score-excellent';
    } else if (percentage >= 60) {
        message = '👍 Good work! Keep practicing!';
        className = 'score-good';
    } else {
        message = '📚 Keep learning and try again!';
        className = 'score-needs-improvement';
    }
    
    scoreMessage.textContent = message;
    scoreMessage.className = `score-message ${className}`;
}

function restartQuiz() {
    resultsContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    initializeQuiz();
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && nextBtn.style.display === 'inline-block') {
        nextQuestion();
    }
    
    // Allow number keys 1-4 to select options
    if (!answered && event.key >= '1' && event.key <= '4') {
        const optionIndex = parseInt(event.key) - 1;
        const options = document.querySelectorAll('.option');
        if (options[optionIndex]) {
            selectAnswer(optionIndex);
        }
    }
});