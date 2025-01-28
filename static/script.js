const wordContainer = document.getElementById("word-container");
const answerLine = document.getElementById("answer-line");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const nextButton = document.getElementById("next-button");
const taskText = document.getElementById("task-text");
const currentTaskText = document.getElementById("current-task");
const progressBar = document.getElementById("progress");

const task1 = {
    question: "Напишите на русском 'Goodbye.'",
    words: ["До", "давай", "после", "свидания"],
    correctAnswer: "До свидания"
};
const task2 = {
    question: "Напишите на русском 'Yes come on'",
    words: ["Да", "зачем", "давай", "нет"],
    correctAnswer: "Да давай"
};
const task3 = {
    question: "Напишите на английском 'Твой кофе'",
    words: ["Your", "tea", "coffee", "my"],
    correctAnswer: "Your coffee"
};
const task4 = {
    question: "Напишите на английском 'I like learning English.'",
    words: ["I", "like", "learning", "English"],
    correctAnswer: "I like learning English"
};
const task5 = {
    question: "Напишите на английском 'I love listening to music, particularly rock music.'",
    words: ["I", "love", "listening", "to", "music,", "particularly", "rock", "music."],
    correctAnswer: "I love listening to music, particularly rock music."
};

let currentTask = task1;
let taskNumber = 1;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // обмен элементов
    }
}

function updateTask(task) {
    shuffleArray(task.words);
    taskText.textContent = task.question;
    wordContainer.innerHTML = "";
    task.words.forEach(word => {
        const button = document.createElement("button");
        button.classList.add("word");
        button.textContent = word;
        wordContainer.appendChild(button);
    });
    answerLine.innerHTML = "";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    nextButton.style.display = "none"; // Скрыть кнопку "Далее"
    
    // Обновляем прогресс
    const progressPercentage = (taskNumber / 5) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    currentTaskText.textContent = `Задание ${taskNumber}/5`;
}

wordContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("word")) {
        const word = e.target;
        answerLine.appendChild(word); // Перемещаем слово в линию
    }
});

answerLine.addEventListener("click", (e) => {
    if (e.target.classList.contains("word")) {
        const word = e.target;
        wordContainer.appendChild(word); // Возвращаем слово в контейнер
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
    if (taskNumber > 5) taskNumber = 1;
    currentTask = taskNumber === 1 ? task1 : taskNumber === 2 ? task2 : taskNumber === 3 ? task3 : taskNumber === 4 ? task4 : task5;  // Поменяли местами задания 4 и 5
    updateTask(currentTask);
});

nextButton.addEventListener("click", () => {
    taskNumber++;
    if (taskNumber > 5) taskNumber = 1;
    currentTask = taskNumber === 1 ? task1 : taskNumber === 2 ? task2 : taskNumber === 3 ? task3 : taskNumber === 4 ? task4 : taskNumber === 5 ? task5 : task4;  // Поменяли местами задания 4 и 5
    updateTask(currentTask);
});

updateTask(currentTask);
