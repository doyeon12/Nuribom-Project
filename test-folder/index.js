const idioms = [
    { term: "呵呵大笑(가가대소)", meaning: "크게 웃다", hint: "웃음과 관련된 표현입니다." },
    { term: "不恥下問(불치하문)", meaning: "아랫사람에게 배우는 것을 부끄러워하지 않다", hint: "누군가에게 배우는 것" },
    { term: "心心相印(심심상인)", meaning: "마음과 마음이 서로 통하다", hint: "사람 간의 깊은 이해" },
    { term: "東奔西走(동분서주)", meaning: "동쪽으로 뛰고 서쪽으로 달리다", hint: "여러 곳으로 바쁘게 다니는 상황" },
    { term: "苦盡甘來(고진감래)", meaning: "고생 끝에 즐거움이 온다.", hint: "어려운 일이 지나면 좋은 일이 생길 것"},
];

let currentIdiomIndex = 0;
let correctAnswersCount = 0;
let timeRemaining = 60;
let timerInterval;

// Fisher-Yates 알고리즘을 사용해 배열을 랜덤으로 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuiz() {
    if (currentIdiomIndex >= idioms.length) {
        clearInterval(timerInterval); // 타이머 중지
        alert(`시험이 끝났습니다! 맞힌 개수: ${correctAnswersCount} / ${idioms.length}`);
        window.location.href = '/index-folder/index.html';
        return;
    }

    const quizQuestion = document.getElementById("quiz-question");
    const quizStatus = document.getElementById("quiz-status");
    const quizOptions = document.getElementById("quiz-options");

    quizQuestion.textContent = `${idioms[currentIdiomIndex].term}의 뜻은 무엇인가요?`;
    quizStatus.textContent = `문제 ${currentIdiomIndex + 1} / ${idioms.length}`;

    const shuffledIdioms = [...idioms];
    shuffleArray(shuffledIdioms);

    quizOptions.innerHTML = "";
    shuffledIdioms.forEach(idiom => {
        const li = document.createElement("li");
        li.textContent = idiom.meaning;
        li.addEventListener("click", () => checkAnswer(idiom.meaning));
        quizOptions.appendChild(li);
    });
}

// 타이머 시작 함수
function startTimer() {
    document.getElementById("timer").textContent = `남은 시간: ${timeRemaining}초`;

    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").textContent = `남은 시간: ${timeRemaining}초`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("시간 초과! 시험이 종료되었습니다.");
            window.location.href = '/nuribom2/index-folder/index.html';
        }
    }, 1000);
}

// 힌트 버튼 클릭 시 팝업으로 힌트를 보여주는 함수
function showHint() {
    const hint = idioms[currentIdiomIndex].hint;
    alert(`힌트: ${hint}`);
}

function checkAnswer(selectedMeaning) {
    const correctMeaning = idioms[currentIdiomIndex].meaning;
    if (selectedMeaning === correctMeaning) {
        alert("정답입니다!");
        correctAnswersCount++;
    } else {
        alert(`틀렸습니다! 정답은 "${correctMeaning}" 입니다.`);
    }

    currentIdiomIndex++;
    displayQuiz();
}

// "잘 모르겠습니다" 버튼 클릭 시 다음 문제로 넘어가는 함수
function skipQuestion() {
    currentIdiomIndex++;
    displayQuiz();
}

// 페이지 로드 시 첫 퀴즈 표시 및 타이머 시작
window.onload = () => {
    displayQuiz();
    startTimer(); // 타이머 시작
    document.getElementById("hint-button").addEventListener("click", showHint);
    document.getElementById("dont-know-button").addEventListener("click", skipQuestion);
};
