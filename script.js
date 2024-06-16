const sentences = [
    "programare wellcode vacanta trei cuvinte care nu le stiu",
    "vacantele linistite sunt esentiale pentru dezvoltarea personala mai incercam",
    "tot ce trebuie sa fac e sa am rabdare acum probabil te gandesti cate cuvinte ai scris"
];
let currentSentence = sentences.join(" / ");
let startTime;
let timer;
let elapsedTimer;
let testStarted = false;
let totalCorrectWords = 0;
let elapsedTime = 0;

function startTest() {
    document.getElementById('result').innerText = '';
    document.getElementById('finalResult').innerText = '';
    document.getElementById('input').value = '';
    document.getElementById('input').disabled = false;
    document.getElementById('input').focus();
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'inline-block';
    startTime = new Date().getTime();
    elapsedTimer = setInterval(updateElapsedTime, 1000);
    document.getElementById('sentence').innerText = currentSentence;
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

document.getElementById('input').addEventListener('input', function () {
    let inputText = this.value;
    let output = '';
    for (let i = 0; i < currentSentence.length; ++i) {
        if (i < inputText.length) {
            if (inputText[i] === currentSentence[i]) {
                output += `<span class="correct">${currentSentence[i]}</span>`;
            } else {
                output += `<span class="incorrect">${currentSentence[i]}</span>`;
            }
        } else {
            output += currentSentence[i];
        }
    }
    document.getElementById('sentence').innerHTML = output;
    calculateResult();
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

    totalCorrectWords = correctWords; // Update to count only the current result
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
    document.getElementById('sentence').innerText = currentSentence;
    document.getElementById('input').value = '';
    document.getElementById('input').disabled = true;
    document.getElementById('startButton').style.display = 'inline-block';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('timer').innerText = 'Time elapsed: 0 seconds';
}
