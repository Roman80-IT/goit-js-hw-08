//* Імпорт та використання ф-ції throttle з бібліотеки lodash
import throttle from 'lodash.throttle';

//* Знаходження елемента форми та додавання обробників подій
const formElement = document.querySelector('.feedback-form');
formElement.addEventListener('input', throttle(onInput, 1000));
formElement.addEventListener('submit', submitForm);

//* Константа для збереження ключа форми у localStorage
const FEEDBACK_FORM_KEY = 'feedback-form-state';
let data = {}; //* Об'єкт для збереження даних форми

//* Ф-ція, яка викликається при завантаженні сторінки
const onLoad = () => {
  try {
    const dataJSON = localStorage.getItem(FEEDBACK_FORM_KEY);
    if (!dataJSON) return;
    data = JSON.parse(dataJSON);
    Object.entries(data).forEach(([key, val]) => {
      formElement.elements[key].value = val;
    });
  } catch (err) {
    console.log(err.message);
  }
};

window.addEventListener('load', onLoad);

//* Ф-ція, яка викликається при введенні даних в поля форми
function onInput(event) {
  data[event.target.name] = event.target.value.trim();
  setToLocalStorage();
}

//* Ф-ція, яка викликається при відправці форми
function submitForm(event) {
  event.preventDefault();
  console.log(data);
  data = {};
  formElement.reset();
  localStorage.removeItem(FEEDBACK_FORM_KEY);
}

//* Збереження даних у localStorage
function setToLocalStorage() {
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(data));
}
