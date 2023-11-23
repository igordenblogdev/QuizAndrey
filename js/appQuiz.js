// создаем массив с вопросами и ответами
const arrayQuestions = [
    {
        question: "Сколько букв в русском алфавите?",
        answer: "33",
        options: [
            "26",
            "25",
            "33",
            "32"
        ]
    },
    {
        question: "Что из списка не является частью слова?",
        answer: "Имя существительное",
        options: [
            "Корень",
            "Имя существительное",
            "Суффикс"
        ]
    },
    {
        question: "Сколько гласных букв в русском алфавите?",
        answer: "10",
        options: [
            "12",
            "10",
            "8",
            "15"
        ]
    },
    {
        question: "На какие вопросы отвечает имя существительное?",
        answer: "Кто? Что?",
        options: [
            "Что делать? Что сделать?",
            "Кто? Что?",
            "Какой? Какие?",
        ]
    },
    {
        question: "Что обозначает глагол?",
        answer: "Действие предмета, лица или явления",
        options: [
            "Признак предмета, лица или явления",
            "Предмет, лицо или явление",
            "Действие предмета, лица или явления",
        ]
    },
    {
        question: "Что обозначает имя прилагательное?",
        answer: "Признак предмета, лица или явления",
        options: [
            "Действие предмета, лица или явления",
            "Признак предмета, лица или явления",
            "Предмет, лицо или явление",
        ]
    },
    {
        question: "Какой буквой обозначается звук, не имеющий твёрдой пары?",
        answer: "Щ",
        options: [
            "Ш",
            "Щ",
            "Ж",
        ]
    },
    {
        question: "Какой звук всегда твёрдый?",
        answer: "Ш",
        options: [
            "Ш",
            "Ч",
            "Т",
        ]
    },
    {
        question: "Сколько согласных звуков в русском языке?",
        answer: "21",
        options: [
            "25",
            "27",
            "21",
        ]
    },
]

"use strict";

const $ = document.querySelector.bind(document);

// ? переменные
// переменная окошка теста
const quiz = $(".quiz");
// переменная окошка предупреждения
const warning = $(".warning");
//переменная кнопки (перехода на следующий вопрос)
const btnNext = $(".quiz__next-btn");
// индекс нашего массива с вопросами
let count = 0;
// переменная правильных ответов пользователя
let userScore = 0

//Проверяем условие есть ли у нас массив с вопросами и не пустой ли
if(arrayQuestions !== null && arrayQuestions.length > 0) {
    quiz.classList.remove("hidden");
    showQuetions(count);
} else {
    warning.classList.remove("hidden");
}

btnNext.addEventListener("click", nextQuestion);

// Функция для отображения вопросов
function showQuetions(index) {
    // переменная вопроса 
    const title = $(".quiz__title");
    // переменная списка ответов
    const list = $(".quiz__list");
    // переменная отвечающая на каком сейчас вопросе
    const total = $(".quiz__total");
    // переменная прогресса ответа на вопросы
    const progress = $(".quiz__progress-inner");
    // выводим на экран
    title.innerHTML = `${arrayQuestions[index].question}`;
    // выодим на экран
    list.innerHTML = '';
    arrayQuestions[index].options.forEach(item => {
        const text = `<li class="quiz__option">${item}</li>`;
        list.insertAdjacentHTML('beforeend', text);
    });

    const options = list.querySelectorAll(".quiz__option");
    options.forEach(item => item.setAttribute("onclick", "optionSelected(this)"));

    total.innerHTML = `${index + 1} из ${arrayQuestions.length}`;
    progress.style.width = `${Math.round((index + 1) /arrayQuestions.length * 100)}%`;
}

function optionSelected(answer) {
    // переменная, в которой храниться выбор пользователя
    const userAnswer = answer.textContent;
    // правильный ответ, который указан в массиве
    const correctAnswer = arrayQuestions[count].answer;
    // записываются все варианты ответа
    const options = document.querySelectorAll(".quiz__option");
    // значок галочка, при правильном ответе
    const iconCorrect = "<span>&#10004</span>";
    // другой значок кирпич, при не правильном ответ
    const iconInCorrect = "<span>&#9940</span>";

    if(userAnswer === correctAnswer) {
        // записываем, одно очко за правильный ответ
        userScore += 1;
        // добовляем класс, что правильно
        answer.classList.add("correct");
        // вставляем в верстку
        answer.insertAdjacentHTML("beforeend", iconCorrect);
    } else {
        // добавляем класс, что не правильно
        answer.classList.add("inCorrect");
        // вставляем в верстку
        answer.insertAdjacentHTML("beforeend", iconInCorrect);
        // проходим по всем вариантов ответа
        options.forEach(item => {
            if(item.textContent == correctAnswer) {
                setTimeout( () => {
                    item.classList.add("correct");
                    item.insertAdjacentHTML("beforeend", iconCorrect);
                }, 1000);
            }
        });
    }
    // блокируем все варианты ответа
    options.forEach(item => item.classList.add("disabled"));
}

function nextQuestion() {
    // переменная любой вкладки
    const option = $(".quiz__option");
    // переменная блока результата
    const result = $(".result");
    // переменная текста результата
    const resultText = $(".result__text");

    // когда закончились вопросы
    if((count + 1) === arrayQuestions.length && option.classList.contains('disabled')) {
        result.classList.remove('hidden');
        quiz.classList.add('hidden')
        resultText.innerHTML = `Количество правильных ответов: ${userScore} из ${arrayQuestions.length}`
        return
    }

    // проверяем наличие класса disabled
    if(option.classList.contains('disabled')) {
        count ++;
        showQuetions(count)
    } else {
        alert('Выберите один из вариантов ответа!!!');
    }


}






