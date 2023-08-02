import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeElement = document.querySelector('iframe');
const CURRENT_TIME_KEY = 'videoplayer-current-time';
let currentTime = localStorage.getItem(CURRENT_TIME_KEY) || 0;

const player = new Player(iframeElement);
player.on('timeupdate', throttle(getCurrentTime, 1000));

setTimeToPlayer(currentTime);

function getCurrentTime(data) {
  currentTime = data.seconds;
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
}

function setTimeToPlayer(time) {
  player.setCurrentTime(time);
}
