//! Форма зворотного зв'язку

//* HTML містить готову розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

//* Розбий його на декілька підзавдань:

//*    1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
//* у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
//*    2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
//* В іншому випадку поля повинні бути порожніми.
//*    3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
//*    4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

//! -------------------------   ВАРІАНТ 2а   -------------------------

import throttle from 'lodash.throttle';

//* Отримання посилань на DOM-елементи форми та полів вводу
const $form = document.querySelector('.feedback-form');
const $emailInput = document.querySelector('input[name="email"]');
const $messageInput = document.querySelector('textarea[name="message"]');

//* Ключ для збереження даних у лок. сховищі
const FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';

//* Об'єкт для збереження даних форми
let formData = {};

//* Ф-ція, яка буде викликатись при завантаженні сторінки
const onLoad = () => {
  try {
    const formDataJSON = localStorage.getItem(FORM_LOCAL_STORAGE_KEY);
    if (formDataJSON) {
      formData = JSON.parse(formDataJSON);
      //* Заповнення полів форми зі збереженими даними
      $emailInput.value = formData.email || '';
      $messageInput.value = formData.message || '';
    }
  } catch (err) {
    console.log(err.message);
  }
};

//* Ф-ція, яка буде викликатись при введенні даних в поля форми
const handleInput = event => {
  formData[event.target.name] = event.target.value.trim();
  //* Збереження даних форми у лок. сховище (із затримкою 500 мс)
  saveFormDataToLocalStorage();
};

//* Ф-ція, яка буде викликатись при відправці форми
const handleSubmit = event => {
  event.preventDefault();

  //* Перевірка, чи всі поля форми заповнені
  const isFormFilled = Object.values(formData).every(
    value => value.trim() !== ''
  );

  if (isFormFilled) {
    console.log(formData);
    //* Очищення полів форми
    $form.reset();
    //* Видалення даних з лок. сховища
    localStorage.removeItem(FORM_LOCAL_STORAGE_KEY);
    //* Очищення об'єкту formData
    formData = {};
  } else {
    alert('Please complete all fields of the form before submitting');
  }
};

//* Ф-ція для збереження даних форми у лок. сховище зі затримкою 500 мс
const saveFormDataToLocalStorage = throttle(() => {
  localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

//* Додавання обробників подій до форми
$form.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

//* Додаємо обробник події 'load' до вікна, який викличе ф-цію onLoad при завантаженні сторінки
window.addEventListener('load', onLoad);

//! -------------------------   ВАРІАНТ 3   -------------------------

// //* Підключення бібліотеки lodash.throttle
// import throttle from 'lodash.throttle';

// //* Отримання посилань на DOM-елементи форми та полів вводу
// const $form = document.querySelector('.feedback-form');
// const $emailInput = document.querySelector('input[name="email"]');
// const $messageInput = document.querySelector('textarea[name="message"]');

// //* Об'єкт для збереження даних форми
// const formData = {};

// //* Завантаження збережених даних з локального сховища, якщо такі є
// if (localStorage.getItem('feedback-form-state')) {
//   const currentFeedbackFormStateValue = localStorage.getItem(
//     'feedback-form-state'
//   );
//   //* Заповнення поля вводу електронної пошти, якщо таке значення є у збережених даних
//   if (JSON.parse(currentFeedbackFormStateValue).email) {
//     const currentEmailValue = JSON.parse(
//       localStorage.getItem('feedback-form-state')
//     ).email;
//     $emailInput.value = currentEmailValue;
//     formData.email = currentEmailValue;
//   }

//   //* Заповнення поля вводу повідомлення, якщо таке значення є у збережених даних
//   if (JSON.parse(currentFeedbackFormStateValue).message) {
//     const currentMessageValue = JSON.parse(
//       localStorage.getItem('feedback-form-state')
//     ).message;
//     $messageInput.value = currentMessageValue;
//     formData.message = currentMessageValue;
//   }
// }

// //* Ф-ція збереження даних у лок. сховище з використанням lodash.throttle
// $form.addEventListener(
//   'input',
//   throttle(event => {
//     formData[event.target.name] = event.target.value;
//     localStorage.setItem('feedback-form-state', JSON.stringify(formData));
//   }, 500)
// );

// //* Обробка події сабміту форми
// $form.addEventListener('submit', event => {
//   event.preventDefault();
//   //* Виведення даних з форми в консоль лише якщо всі поля заповнені
//   if (formData.email.trim() !== '' && formData.message.trim() !== '') {
//     console.log(formData);
//     //* Очищення локального сховища
//     localStorage.removeItem('feedback-form-state');
//     //* Очищення полів форми
//     $emailInput.value = '';
//     $messageInput.value = '';
//     //* Обнулення об'єкту formData
//     formData = {};
//   } else {
//     //* Альорт, якщо не всі поля заповнені
//     alert('Please complete all fields of the form before submitting.');
//   }
// });

//! -------------------------   ВАРІАНТ 4   -------------------------

// //* Підключення бібліотеки
// const throttle = require('lodash.throttle');

// document.addEventListener('DOMContentLoaded', () => {
//   const $form = document.querySelector('.feedback-form');
//   const $emailInput = $form.querySelector('input[name="email"]');
//   const $messageInput = $form.querySelector('textarea[name="message"]');

//   //* Отримання даних з лок. сховища або створення порожнього об'єкту
//   const storedData =
//     JSON.parse(localStorage.getItem('feedback-form-state')) || {};
//   //* Заповнення полів форми збереженими даними
//   $emailInput.value = storedData.email || '';
//   $messageInput.value = storedData.message || '';

//   //* Об'єкт для збереження даних форми
//   const formData = {
//     email: '',
//     message: '',
//   };

//   //* Ф-ція збереження даних у лок. сховище
//   const saveToLocalStorage = () => {
//     //* Оновлення властивостей об'єкта formData з поточними значеннями полів форми
//     formData.email = $emailInput.value;
//     formData.message = $messageInput.value;
//     //* Збереження об'єкта formData в локальне сховище
//     localStorage.setItem('feedback-form-state', JSON.stringify(formData));
//   };

//   //* Відстежування події вводу і виклик ф-ції збереження з затримкою
//   $form.addEventListener('input', throttle(saveToLocalStorage, 500));

//   //* Обробка події сабміту форми
//   $form.addEventListener('submit', event => {
//     event.preventDefault();
//     //* Оновлення об'єкта formData з поточними значеннями полів форми
//     formData.email = $emailInput.value;
//     formData.message = $messageInput.value;

//     //* Перевірка, чи всі поля форми не порожні
//     if (formData.email.trim() !== '' && formData.message.trim() !== '') {
//       console.log(formData); //* Виведення даних з форми в консоль
//       localStorage.removeItem('feedback-form-state'); //* Очищення локального сховища
//       //* Очищення полів форми
//       $emailInput.value = '';
//       $messageInput.value = '';
//       //* Обнулення об'єкта formData
//       formData.email = '';
//       formData.message = '';
//     } else {
//       //* Альорт, якщо не всі поля заповнені
//       alert('Please complete all fields of the form before submitting');
//     }
//   });
// });
