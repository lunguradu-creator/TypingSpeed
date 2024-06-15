const sentences = [
    "Programarea este noua mea pasiune",
    "Vacantele linistite sunt esentiale pentru dezvoltarea personala",
    "Traieste-ti viata, bucura-te de fiecare clipa",
    "Good vibes, good life."
];
let currentSentence = '';
let startTime;
let timer;
let elapsedTimer;
let testStarted = false;
let totalCorrectWords = 0;
let elapsedTime = 0;

function startOrNextSentence() {
    if (!testStarted) {
        startTest();
    } else {
        calculateResult();
        showNextSentence();
    }
}

function startTest() {
    document.getElementById('result').innerText = '';
    document.getElementById('finalResult').innerText = '';
    document.getElementById('input').value = '';
    document.getElementById('input').disabled = false;
    document.getElementById('input').focus();
    document.getElementById('startButton').innerText = 'Next phrase';
    document.getElementById('resetButton').style.display = 'inline-block';
    startTime = new Date().getTime();
    elapsedTimer = setInterval(updateElapsedTime, 1000);
    showNextSentence();
    timer = setTimeout(endTest, 60000); // Test ends after 60 seconds, we can adjust the time.
    testStarted = true;
}

function updateElapsedTime() {
    ++elapsedTime;
    document.getElementById('timer').innerText = `Time elapsed: ${elapsedTime} seconds`;
    if (elapsedTime >= 60) {
        clearInterval(elapsedTimer);
    }
}

function showNextSentence() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById('sentence').innerText = currentSentence;
}

document.getElementById('input').addEventListener('input', function () {
    let inputText = this.value;
    let output = '';
    for (let i = 0; i < inputText.length; ++i) {
        if (i < currentSentence.length) {
            if (inputText[i] === currentSentence[i]) {
                output += `<span class="correct">${inputText[i]}</span>`;
            } else {
                output += `<span class="incorrect">${inputText[i]}</span>`;
            }
        } else {
            output += `<span class="incorrect">${inputText[i]}</span>`;
        }
    }
    document.getElementById('sentence').innerHTML = output;
});

function endTest() {
    document.getElementById('input').disabled = true;
    clearTimeout(timer);
    clearInterval(elapsedTimer);
    calculateResult();
    document.getElementById('finalResult').innerText = `Test over! You typed ${totalCorrectWords} words correctly in 60 seconds.`;
}

function calculateResult() {
    let inputText = document.getElementById('input').value.trim();
    let correctWords = 0;
    let inputWords = inputText.split(' ');
    let sentenceWords = currentSentence.split(' ');

    for (let i = 0; i < inputWords.length; ++i) {
        if (inputWords[i] === sentenceWords[i]) {
            ++correctWords;
        }
    }

    totalCorrectWords += correctWords;
    document.getElementById('result').innerText = `You typed ${totalCorrectWords} words correctly so far.`;
}

function resetTest() {
    clearTimeout(timer);
    clearInterval(elapsedTimer);
    testStarted = false;
    totalCorrectWords = 0;
    elapsedTime = 0;
    document.getElementById('result').innerText = '';
    document.getElementById('finalResult').innerText = '';
    document.getElementById('sentence').innerText = '';
    document.getElementById('input').value = '';
    document.getElementById('input').disabled = true;
    document.getElementById('startButton').innerText = 'Start Test';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('timer').innerText = 'Time elapsed: 0 seconds';
}
