//! ------------------------   ВАРІАНТ 1   -----------------------------

//* Імпорт та використання ф-ції throttle з бібліотеки lodash
//* Підключення бібліотеки lodash для створення ф-ції, яка буде викликатись зі затримкою
// import throttle from 'lodash.throttle';

// //* Знаходження елемента форми та додавання обробників подій
// const formElement = document.querySelector('.feedback-form');
// formElement.addEventListener('input', throttle(onInput, 500));
// formElement.addEventListener('submit', submitForm);

// //* Константа для збереження ключа форми у localStorage
// const FEEDBACK_FORM_KEY = 'feedback-form-state';
// let data = {}; //* Об'єкт для збереження даних форми

// //* Ф-ція, яка викликається при завантаженні сторінки
// const onLoad = () => {
//   try {
//     const dataJSON = localStorage.getItem(FEEDBACK_FORM_KEY);
//     if (!dataJSON) return;
//     data = JSON.parse(dataJSON);
//     Object.entries(data).forEach(([key, val]) => {
//       formElement.elements[key].value = val;
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// window.addEventListener('load', onLoad);

// //* Ф-ція, яка викликається при введенні даних в поля форми
// function onInput(event) {
//   data[event.target.name] = event.target.value.trim();
//   setToLocalStorage();
// }

// //* Ф-ція, яка викликається при відправці форми
// function submitForm(event) {
//   event.preventDefault();
//   console.log(data);
//   data = {};
//   formElement.reset();
//   localStorage.removeItem(FEEDBACK_FORM_KEY);
// }

// //* Збереження даних у localStorage
// function setToLocalStorage() {
//   localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(data));
// }

//! -------------------------   ВАРІАНТ 2   -------------------------

//* Відправляємо сабміт лише в тому випадку, якщо заповнені всі поля форми, інакше показуємо альорт як ми робили у 6-му дз таск 8,
//* якщо все заповнено  дані збираємо в іменований обʼєкт, виводимо його в консоль, чистимо локал сторедж по ключу, очищаємо форму та обнулюємо обʼєкт.
//*      в консоль виводимо лише якщо все заповнено

// import throttle from 'lodash.throttle';

// //* Отримання посилання на DOM-елемент форми
// const $form = document.querySelector('.feedback-form');

// //* Додавання обробника події 'submit' та 'input' до форми зі зміною стану зі затримкою 500 мс
// $form.addEventListener('input', throttle(handleInput, 500));

// //* Додавання обробника події 'submit' до форми при натисканні на кнопку відправки
// $form.addEventListener('submit', handleSubmit);

// //* Ключ для збереження даних у лок. сховищі
// const FEEDBACK_FORM_KEY = 'feedback-form-state';

// //* Об'єкт для збереження даних форми
// let formData = {};

// //* Ф-ція, яка буде викликатись при завантаженні сторінки
// const onLoad = () => {
//   try {
//     //* Отримання збережених даних з лок. сховища
//     const formDataJSON = localStorage.getItem(FEEDBACK_FORM_KEY);
//     //* Перевірка, чи є збережені дані
//     if (!formDataJSON) return;
//     //* Парсимо JSON збережених даних і записуємо у змінну formData
//     formData = JSON.parse(formDataJSON);
//     //* Проходимося по елементам форми і заповнюємо їх значеннями з formData
//     Object.entries(formData).forEach(([key, val]) => {
//       $form.elements[key].value = val;
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// //* Додаємо обробник події 'load' до вікна, який викличе ф-цію onLoad при завантаженні сторінки
// window.addEventListener('load', onLoad);

// //* Ф-ція, яка буде викликатись при введенні даних в поля форми
// function handleInput(event) {
//   //* Оновлюємо дані в formData зі значенням введеним в полі форми
//   formData[event.target.name] = event.target.value.trim();
// }

// //* Ф-ція, яка буде викликатись при відправці форми
// function handleSubmit(event) {
//   //* Зупиняємо стандартну поведінку форми (не відправляємо на сервер)
//   event.preventDefault();

//   //* Перевірка, чи всі поля форми заповнені
//   const isFormFilled = Object.keys(formData).every(key => formData[key] !== '');

//   //* Якщо всі поля заповнені
//   if (isFormFilled) {
//     //* Виводимо дані форми в консоль
//     console.log(formData);
//     //* Очищуємо об'єкт formData
//     formData = {};
//     //* Очищуємо поля форми
//     $form.reset();
//     //* Видаляємо дані з локального сховища
//     localStorage.removeItem(FEEDBACK_FORM_KEY);
//   } else {
//     //* Якщо не всі поля заповнені, виводимо повідомлення
//     alert('Please complete all fields of the form before submitting');
//   }
// }

// //* Ф-ція для збереження даних форми у лок. сховище
// function saveFormDataToLocalStorage() {
//   localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
// }
