// Load questions from the JSON file

let questions = [];
let currentQuestionIndex = 0;

let scores = [0,0,0,0,0]

fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion()
})
.catch(error => console.error('Error loading questions:', error));


function loadQuestion() {
    const question = questions[currentQuestionIndex];
    
    document.getElementById('question').textContent = "Q" + (1 + currentQuestionIndex) + ": " + question.question;
    const answersParagraph = document.getElementById('answers');
    const answerTexts = question.answers;

    const answersString = answerTexts.join('<br>');

    answersParagraph.innerHTML = answersString; 
}


const buttons = document.querySelectorAll('.option-button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        scores[parseInt(button.id)] += parseInt(questions[currentQuestionIndex].weights[button.id]);

        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            const topScore = scores.indexOf(Math.max(...scores));
            window.location.href = './choices/choice' + (topScore + 1) + '.html';
        }
    });
});