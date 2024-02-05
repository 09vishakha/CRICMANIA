let poll = {
    question: "WHICH TEAM DO YOU THINK WOULD WIN THE ICC T20 WORLD CUP 2024?",
    answers: ["INDIA", "AUSTRALIA", "ENGLAND", "NEWZEALAND", "BANGLADESH", "PAKISTAN", "WEST INDIES", "SRILANKA", "SOUTH AFRICA"],
    pollCount: 200,
    answersWeight: [50, 35, 25, 20, 30, 15, 10, 5, 10],
    selectedAnswer: -1
};

let pollDOM = {
    question: document.querySelector(".poll .question"),
    answers: document.querySelector(".poll .answers")
};

pollDOM.question.innerText = poll.question;
pollDOM.answers.innerHTML = poll.answers.map(function (answer, i) {
    return (
        `
        <div class="answer" onclick="markAnswer(${i})">
            ${answer}
            <span class="percentage-bar"></span>
            <span class="percentage-value"></span>
        </div>
        `
    );
}).join("");

function markAnswer(i) {
    poll.selectedAnswer = +i;
    try {
        document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
    } catch (msg) { }
    document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
    showResults();
}

function showResults() {
    let answers = document.querySelectorAll(".poll .answers .answer");
    for (let i = 0; i < answers.length; i++) {
        let percentage = 0;
        if (i == poll.selectedAnswer) {
            percentage = Math.round((poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1));
        } else {
            percentage = Math.round((poll.answersWeight[i]) * 100 / (poll.pollCount + 1));
        }
        answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
        answers[i].querySelector(".percentage-value").innerText = percentage + "%";
    }
}
