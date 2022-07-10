let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right-answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right-answer": 3
    },
    {
        "question": "Wie bindet man eine Webseite in eine Webseite ein?",
        "answer_1": "&lt;iframe&gt;, &lt;iframe&gt;, and &lt;iframe&gt;",
        "answer_2": "&lt;iframe&gt;",
        "asnwer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right-answer": 2
    },
    {
        "question": "Wie stellt man Text am BESTEN fett dar?",
        "answer_1": "&lt;strong&gt;",
        "answer_2": "CSS nutzen",
        "asnwer_3": "&lt;bold&gt;",
        "answer_4": "&lt;b&gt;",
        "right-answer": 1
    },
    {
        "question": "Welches Attribut kan man NICHT für Texrarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "asnwer_3": "from",
        "answer_4": "spellcheck",
        "right-answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "asnwer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right-answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "asnwer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right-answer": 4
    },
];

/*     {
        "question": "",
        "answer_1": "",
        "answer_2": "",
        "asnwer_3": "",
        "answer_4": "",
        "right-answer": 
    }, */

let rightQuestions = 0;
let currentQuestion = 0;
// Anbindung von Audio Dateien aus dem Projekt Unterordner audio
let AUDIO_SUCCESS = new Audio('audio/success.wav');
let AUDIO_FAIL = new Audio('audio/fail.wav');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    // Aus dieser Funktion kommt jetzt die Validierung des unteren Ausdruckes (d.h. wenn dies verkürzt als Fktn in der If-Bedingung geschrieben wird, wird der geprüfte Wert, etnweder true oder false als return gegeben.)
    return currentQuestion >= questions.length
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none'
    document.getElementById('amount-of-question').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png'
}


function updateProgressBar() {
    // Damit man bei 1. Frage schon vor der Beantwortung der Frageb ei 14 % ist und bei letzter Frage vor Beantwortung der Frage bei 100% wird currentQuestion um 1 erhöht, da die Fragennummerierung für die richtige Darstellung nicht bei der Frage Nr. 0 für die Prozentrechnung anfangen soll, sondern bei 1. Anderseits 0 / array.lenght ergibt bei currentQuestion = 0 somit 0%, was eine falsche Anzeige wäre.
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right-answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        /* Mit pareNode greift man auf den Parent des ID-Elementes zu.*/
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    // Auch hier wird die If-Bedingung bei der Fktn asnwer() mithilfe einer separaten Funktion besser verständlicher dargestellt. Hier muss die Funktion mit Parameter definiert werden, damit die Variable die hier zuerst nicht bekannt ist, aus des dem anderen Funktionsblock übernommen wird. 
    return selectedQuestionNumber == question['right-answer'];
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    document.getElementById('header-image').src = 'img/pencil.jpg';
    // questionBody wieder anzeigen
    document.getElementById('questionBody').style = '';
    // Endschreen ausblenden
    document.getElementById('endScreen').style = 'display: none';

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}
