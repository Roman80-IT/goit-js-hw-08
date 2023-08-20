//! Форма зворотного зв'язку

//* HTML містить готову розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

//* Розбий його на декілька підзавдань:

//*    1. Відстежуй на формі подію input, і щоразу записуй у лок. сховище об'єкт з полями email і message,
//* у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
//*    2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
//* В іншому випадку поля повинні бути порожніми.
//*    3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
//*    4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

//! -------------------------   ВАРІАНТ 2б   -------------------------

import throttle from 'lodash.throttle';

const $form = document.querySelector('.feedback-form');
const $emailInput = document.querySelector('input[name="email"]');
const $messageInput = document.querySelector('textarea[name="message"]');

const FORM_LOCAL_STORAGE_KEY = 'feedback-form-state';

let formData = {};

//* Ф-ція, при завантаженні сторінки
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

//* Ф-ція, при введенні даних в поля форми
const handleInput = event => {
  formData[event.target.name] = event.target.value.trim();
  saveFormDataToLocalStorage();
};

const handleSubmit = event => {
  event.preventDefault();

  if ($emailInput.value === '' || $messageInput.value === '') {
    alert('Всі поля повинні бути заповнені');
    return;
  }

  console.log(formData);
  $form.reset();
  localStorage.removeItem(FORM_LOCAL_STORAGE_KEY);
  formData = {};
};

//* Ф-ція для збереження даних форми у лок. сховище
const saveFormDataToLocalStorage = throttle(() => {
  localStorage.setItem(FORM_LOCAL_STORAGE_KEY, JSON.stringify(formData));
}, 500);

$form.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

window.addEventListener('load', onLoad);
