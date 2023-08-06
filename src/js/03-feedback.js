//! Форма зворотного зв'язку

//* HTML містить готову розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

//* Розбий його на декілька підзавдань:

//*    1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
//* у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
//*    2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
//* В іншому випадку поля повинні бути порожніми.
//*    3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
//*    4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

//! ------------------------   ВАРІАНТ 1   -----------------------------

// //* Імпорт та використання ф-ції throttle з бібліотеки lodash
// import throttle from 'lodash.throttle';

// //* Знаходження елемента форми та додавання обробників подій
// const formElement = document.querySelector('.feedback-form');
// formElement.addEventListener('input', throttle(onInput, 1000));
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

import throttle from 'lodash.throttle';

const $form = document.querySelector('.feedback-form');
$form.addEventListener('input', throttle(handleInput, 1000));
$form.addEventListener('submit', handleSubmit);

const FEEDBACK_FORM_KEY = 'feedback-form-state';
let formData = {};

const onLoad = () => {
  try {
    const formDataJSON = localStorage.getItem(FEEDBACK_FORM_KEY);
    if (!formDataJSON) return;
    formData = JSON.parse(formDataJSON);
    Object.entries(formData).forEach(([key, val]) => {
      $form.elements[key].value = val;
    });
  } catch (err) {
    console.log(err.message);
  }
};

window.addEventListener('load', onLoad);

function handleInput(event) {
  formData[event.target.name] = event.target.value.trim();
}

function handleSubmit(event) {
  event.preventDefault();
  const isFormFilled = Object.keys(formData).every(key => formData[key] !== '');
  if (isFormFilled) {
    console.log(formData);
    formData = {};
    $form.reset();
    localStorage.removeItem(FEEDBACK_FORM_KEY);
  } else {
    alert('Будь ласка, заповніть всі поля форми перед відправкою.');
  }
}

function saveFormDataToLocalStorage() {
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}
