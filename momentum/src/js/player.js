import playList from './playList.js';

const audio = new Audio();
const audioPlayButton = document.querySelector('.play');
const audioPlayNextButton = document.querySelector('.play-next');
const audioPlayPrevButton = document.querySelector('.play-prev');
const audioPlayList = document.querySelector('.play-list');

const soundTittle = document.querySelector(".play-title");
const volumeButton = document.querySelector(".vol-mute");
const audioProgress = document.querySelector(".progress-bar");
const audioVolume = document.querySelector('.vol-line');
const audioCurrentTime = document.querySelector(".play-current-time");
const audioDurationTime = document.querySelector(".play-duration-time");

let isPlay = false;
let playNum = 0;
let activeSong = [];
let currentVolume;
let playListItem;
let currentTimeValue = 0;

function playAudio() {
  const itemActive = document.querySelectorAll('li.item-active');
  if (itemActive.length) itemActive[0].classList.remove('item-active');
  playListItem.forEach(song => {
    if (song.classList.contains('play-item-pause')) song.classList.remove('play-item-pause');
  });
  audio.src = playList[playNum].src;
  audio.currentTime = currentTimeValue;
  setDurationTime(playList[playNum].duration);
  if (!isPlay) {
    isPlay = true;
    audio.play();
    audio.volume = audioVolume.value/100;
    activeSong[playNum].classList.add('item-active');
    playListItem[playNum].classList.add('play-item-pause');
    setCurrentTime();
  } else {
    isPlay = false;
    audio.pause();
  }
  setSoundName(playList[playNum].title);
}

function playChosenAudio() {
  for (let i = 0; i < playListItem.length; i++) {        
    playListItem[i].addEventListener('click', function() {
      if (i == playNum && isPlay) {
        isPlay = true;
        currentTimeValue = audio.currentTime;
        playAudio();
        addPauseButton();
      } else {
        if (i != playNum) currentTimeValue = 0;
        playListItem.forEach((item) => item.classList.remove('play-item-pause'))
        playListItem[i].classList.add('play-item-pause');
        playNum = i;
        isPlay = false;
        playAudio();
        addPauseButton();
      }
    })
  }
}

function toggleButton() {
  audioPlayButton.classList.toggle('pause');
}

function addPauseButton() {
  audioPlayButton.classList.add('pause');
}

function playNextAudio() {
  (playNum == playList.length-1) ? playNum = 0 : playNum++;
  isPlay = false;
  currentTimeValue = 0;
  addPauseButton();
  playAudio();
}

function playPrevAudio() {
  (playNum == 0) ? playNum == playList.length-1 : playNum--;
  isPlay = false;
  currentTimeValue = 0;
  addPauseButton();
  playAudio();
}

function createPlayList() {
  playList.forEach(song => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    const text = document.createElement('span');
    text.classList.add('play-item-text');
    li.append(text);
    text.textContent = song.title;
    audioPlayList.append(li);
    const item = document.createElement('span');
    item.classList.add('play');
    item.classList.add('play-item-btn');
    li.append(item);
  });
  activeSong = document.querySelectorAll('.play-item');
  playListItem = document.querySelectorAll('.play-item-btn');
  playChosenAudio();
}

function setSoundName(title) {
  soundTittle.textContent = title;
}

function setValue() {
  audio.volume = audioVolume.value / 100;
}

function muteAudio() {
  if (audioVolume.value > 0) {
      currentVolume = audioVolume.value;
      audioVolume.value = 0;
      volumeButton.classList.add('mute-icon');
      setValue();
  } else {
      audioVolume.value = currentVolume;
      volumeButton.classList.remove('mute-icon');
      setValue();
  }
}

function renewProgress(elem) {
  const {currentTime, duration} = elem.target;
  const currentValue = currentTime / duration * 100;
  if (!isNaN(currentValue))  {
      currentTimeValue = currentTime; 
      audioProgress.value = currentValue;
  }
}

function setProgress() {
  const audioDuration = audio.duration;
  if (!isNaN(audioDuration)) audio.currentTime = audioProgress.value / 100 * audioDuration;
  audio.addEventListener('timeupdate', renewProgress);
}

function convertTime(duration) {
  let minutes, seconds, minutesString, secondsString;
  minutes = Math.floor(duration / 60);
  seconds = Math.floor(duration % 60);
  minutesString = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  secondsString = (seconds < 10) ? "0" + String(seconds) : String(seconds);
  return `${minutesString}:${secondsString}`;
}

function setDurationTime(duration) {
  audioDurationTime.innerHTML = convertTime(duration);
}

function setCurrentTime() {
  audioCurrentTime.innerHTML = convertTime(currentTimeValue);
  setTimeout(setCurrentTime, 500);
}

export default function initAudio() {
  createPlayList();
  audioPlayButton.addEventListener('click', playAudio);
  audioPlayButton.addEventListener('click', toggleButton);
  audioPlayNextButton.addEventListener('click', playNextAudio);
  audioPlayPrevButton.addEventListener('click', playPrevAudio);
  audio.addEventListener('ended', playNextAudio);
  volumeButton.addEventListener('click', muteAudio);
  audioVolume.addEventListener('change', setValue);
  audioProgress.addEventListener('change', setProgress);
  audio.addEventListener('timeupdate', renewProgress);
  audioProgress.oninput = function() {
    audio.removeEventListener('timeupdate', renewProgress);
  }
}
