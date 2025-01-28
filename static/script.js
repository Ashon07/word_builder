const wordContainer = document.getElementById("word-container");
const answerLine = document.getElementById("answer-line");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const nextButton = document.getElementById("next-button");
const taskText = document.getElementById("task-text");
const currentTaskText = document.getElementById("current-task");
const progressBar = document.getElementById("progress");

// Все задания
const tasks = [
    {
        question: "Put the words in the right order.",
        options: ["brother", "My", "fast", "runs"],
        correctAnswer: "My brother runs fast"
    },
    {
        question: "Make up questions.",
        options: ["you", "like", "Do", "watch", "TV?", "to."],
        correctAnswer: "Do you like to watch TV?"
    },
    {
        question: "Make up special question.",
        options: ["often", "How", "do", "music", "to", "you", "listen?"],
        correctAnswer: "How often do you listen to music?"
    },
    {
        question: "Which word is the odd one?",
        options: ["Quickly", "Beautifully", "Happiness", "Carefull"],
        correctAnswer: "Happiness"
    },
    {
        question: "Which conjunction is the odd one out?",
        options: ["And", "But", "Because", "Fast"],
        correctAnswer: "Fast"
    }
];

let currentTask = tasks[0];
let taskNumber = 1;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateTask(task) {
    shuffleArray(task.options);
    taskText.textContent = task.question;
    wordContainer.innerHTML = "";
    task.options.forEach(word => {
        const button = document.createElement("button");
        button.classList.add("word");
        button.textContent = word;
        wordContainer.appendChild(button);
    });
    answerLine.innerHTML = "";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    nextButton.style.display = "none";

    // Обновляем прогресс
    const progressPercentage = (taskNumber / tasks.length) * 100;
    progressBar.style.width = ${progressPercentage}%;
    currentTaskText.textContent = Задание ${taskNumber}/${tasks.length};
}

wordContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("word")) {
        const word = e.target;
        answerLine.appendChild(word);
    }
});

answerLine.addEventListener("click", (e) => {
    if (e.target.classList.contains("word")) {
        const word = e.target;
        wordContainer.appendChild(word);
    }
});

document.getElementById("check").addEventListener("click", () => {
    const answer = Array.from(answerLine.children).map(word => word.textContent).join(" ");

    if (answer === currentTask.correctAnswer) {
        successMessage.textContent = "Правильно!";
        successMessage.style.display = "block";
        errorMessage.style.display = "none";
        nextButton.style.display = "block";
    } else {
        errorMessage.textContent = "Попробуйте ещё раз!";
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
    }
});

document.getElementById("skip").addEventListener("click", () => {
    taskNumber++;
    if (taskNumber > tasks.length) taskNumber = 1;
    currentTask = tasks[(taskNumber - 1) % tasks.length];
    updateTask(currentTask);
});

nextButton.addEventListener("click", () => {
    taskNumber++;
    if (taskNumber > tasks.length) taskNumber = 1;
    currentTask = tasks[(taskNumber - 1) % tasks.length];
    updateTask(currentTask);
});

updateTask(currentTask);