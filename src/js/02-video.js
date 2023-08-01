//* HTML містить <iframe> з відео для Vimeo плеєра.
//* Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, після перезавантаження сторінки, продовжувати відтворювати відео з цього часу
//   Ознайомся з документацією бібліотеки Vimeo плеєра.
//   Додай бібліотеку як залежність проекту через npm.
//   Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN
//   Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
//   Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//   Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//   Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

//! Інсталюємо в терміналі $        npm install @vimeo/player        (документація  https://github.com/vimeo/player.js/#vimeo-player-api )

import Player from '@vimeo/player';

//! Інсталюємо в терміналі      npm install lodash.throttle
//! або одночасно обидві:       npm install @vimeo/player lodash.throttle

//* Ініціалізую плеєр у скрипті як це описано в секції pre-existing player:
// const iframe = document.querySelector('iframe');
// const player = new Vimeo.Player(iframe);

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

//! // // // // // // // // // // // //
const iframeElement = document.querySelector('iframe');

//* Щоб зберегти час відтворення у локальне сховище - Нехай ключем для сховища буде рядок "videoplayer-current-time".
const CURRENT_TIME_KEY = 'videoplayer-current-time';

const player = new Player(iframeElement);
