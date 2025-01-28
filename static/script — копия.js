const wordContainer = document.getElementById("word-container");
const answerLine = document.getElementById("answer-line");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const nextButton = document.getElementById("next-button");

const task1 = ["I", "like", "learning", "English"];
const task2 = ["I", "love", "listening", "to", "music,", "particularly", "rock", "music."];

let currentTask = task1;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // обмен элементов
    }
}

function updateTask(task) {
    shuffleArray(task);
    wordContainer.innerHTML = "";
    task.forEach(word => {
        const button = document.createElement("button");
        button.classList.add("word");
        button.textContent = word;
        wordContainer.appendChild(button);
    });
    answerLine.innerHTML = "";
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    nextButton.style.display = "none"; // Скрыть кнопку "Далее"
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
    const correctAnswer = currentTask === task1 ? "I like learning English" : "I love listening to music, particularly rock music.";
    
    if (answer === correctAnswer) {
        successMessage.textContent = "Правильно!"; // Устанавливаем текст успеха
        successMessage.style.display = "block"; // Показываем сообщение
        errorMessage.style.display = "none"; // Скрываем сообщение об ошибке
        nextButton.style.display = "block"; // Показываем кнопку "Далее"
    } else {
        errorMessage.textContent = "Попробуйте ещё раз!"; // Устанавливаем текст ошибки
        errorMessage.style.display = "block"; // Показываем сообщение
        successMessage.style.display = "none"; // Скрываем сообщение о правильном ответе
    }
});

document.getElementById("skip").addEventListener("click", () => {
    currentTask = currentTask === task1 ? task2 : task1; // Переключаем задания
    updateTask(currentTask); // Обновляем задание
});

nextButton.addEventListener("click", () => {
    currentTask = currentTask === task1 ? task2 : task1; // Переключаем задания
    updateTask(currentTask); // Обновляем задание
});

updateTask(currentTask); // Инициализируем первое задание
