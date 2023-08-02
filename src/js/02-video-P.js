//* HTML містить <iframe> з відео для Vimeo плеєра.
//* Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, після перезавантаження сторінки, продовжувати відтворювати відео з цього часу
//    1 Ознайомся з документацією бібліотеки Vimeo плеєра.
//    2 Додай бібліотеку як залежність проекту через npm.
//    3 Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN
//                const iframe = document.querySelector('iframe');
//                const player = new Vimeo.Player(iframe);

//                player.on('play', function () {
//                  console.log('played the video!');
//                });

//                player.getVideoTitle().then(function (title) {
//                  console.log('title:', title);
//                });
//     4 Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// ? -------------------------------------------------------------------
//? on(event: string, callback: function): void
// Add an event listener for the specified event. Will call the callback with a single parameter, data, that contains the data for that event. See events below for details.
// Додайте обробник події для вказаної події. Викличе зворотний виклик з одним параметром, даними, який містить дані для цієї події

// const onPlay = function(data) {
//*     // data — це об’єкт, що містить властивості, характерні для цієї події
// };

// player.on('play', onPlay);

//* Ви можете прослухати події в плеєрі, прикріпивши зворотний виклик за допомогою '.on()':
// ? -------------------------------------------------------------------
//     5 Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//     6 Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//     7 Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

//! Інсталюємо в терміналі $        npm install @vimeo/player        (документація  https://github.com/vimeo/player.js/#vimeo-player-api )
//! Інсталюємо в терміналі          npm install lodash.throttle
//! або одночасно обидві:           npm install @vimeo/player lodash.throttle

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//* знаходимо перший HTML-елемент <iframe> на сторінці (він в нас один) і зберігаємо його в змінну 'iframeElement'
const iframeElement = document.querySelector('iframe');

//* Щоб зберегти час відтворення у локальне сховище - Нехай ключем для сховища буде рядок "videoplayer-current-time".
//* константа - назва ключа, який буде використовуватися для збереження і отримання часу відтворення в localStorage
const CURRENT_TIME_KEY = 'videoplayer-current-time';

//* отримуємо час відтворення відео з localStorage за допомогою методу localStorage.getItem().
//* Якщо значення не знайдено (напр., при 1-му завантаженні сторінки), змінна currentTime буде встановлена в 0
let currentTime = localStorage.getItem(CURRENT_TIME_KEY) || 0;

//* створимо новий (об'єкт) екземпляр плеєра Vimeo, використовуючи клас Player. iframeElement є змінною, в якій є посилання на HTML-елемент <iframe>, який пов'язаний з плеєром Vimeo на сторінці
//* Це дозволить взаємодіяти з плеєром Vimeo через цей об'єкт
const player = new Player(iframeElement);

//* встановимо обробник події timeupdate для плеєра Vimeo. Ф-ція throttle(getCurrentTime, 1000) обмежує частоту виклику ф-ції getCurrentTime - коли відео відтворюється,
//*  ф-ція getCurrentTime буде викликана з оновленням часу відтворення відео кожну секунду, - зберігаємо цей час у змінній currentTime на localStorage
player.on('timeupdate', throttle(getCurrentTime, 1000));

//* Встановимо час відтворення відео до останнього збереженого значення currentTime. Викликається під час завантаження сторінки, щоб відновити час відтворення відео, який був збережений
setTimeToPlayer(currentTime);

//* Ця ф-ція викликається під час кожного оновлення часу відтворення відео.
//* Вона отримує об'єкт data, який містить інформацію про час відтворення відео (data.seconds містить час в секундах).
//* Ф-ція оновлює змінну currentTime з поточним часом відтворення і зберігає його в localStorage
function getCurrentTime(data) {
  currentTime = data.seconds;
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
}

//* Встановимо час відтворення відео до певного значення time за допомогою методу player.setCurrentTime(time).
function setTimeToPlayer(time) {
  player.setCurrentTime(time);
}
