// script.js

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

let songIndex = 0;

const songs = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    src: 'songs/song1.mp3'
  },
  {
    title: 'Song 2',
    artist: 'Artist 2',
    src: 'songs/song2.mp3'
  },
  {
    title: 'Song 3',
    artist: 'Artist 3',
    src: 'songs/song3.mp3'
  }
];

// Load song details
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightActive(index);
}

// Play / Pause toggle
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
}

// Update progress
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Set progress
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume control
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Format time
function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Playlist
function renderPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      songIndex = index;
      loadSong(songIndex);
      audio.play();
    });
    playlistEl.appendChild(li);
  });
}

function highlightActive(index) {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

// Autoplay next
audio.addEventListener('ended', nextSong);

// Events
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Init
loadSong(songIndex);
renderPlaylist();
