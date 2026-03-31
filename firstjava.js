//for div in about me
let show_hide = function(btn) {
    let divContainer = btn.nextElementSibling;

    if (divContainer.style.display === 'none') {
        divContainer.style.display = 'block';
    } else {
        divContainer.style.display = 'none';
    }
}
//music!!
const playlistSelect = document.getElementById("playlist_select");
let coverArt = document.querySelector(".cover_art");
let songTitle = document.querySelector(".song_name");
let artistName = document.querySelector(".artist_name");
 
let playPause = document.querySelector(".play_pause");
let lastSong = document.querySelector(".last_song");
let nextButton = document.querySelector(".next_song");
 
let seekSlider = document.querySelector(".seekSlider");
let currentTime = document.querySelector(".current_time");
let songLength = document.querySelector(".song_length");
 
let song_index = 0;
let isPlaying = false;
let updateTimer;
let currentSong = document.getElementById("music");

const playlists = {
"preformative ahaha": [
    {img: "cologne_beabadoobee.png",
    name: "Cologne",
    artist: "beabadoobee",
    music: "https://files.catbox.moe/7nz8vt.mp3"},
    {img: "takeabite_beabadoobee.png",
    name: "Take A Bite",
    artist: "beabadoobee",
    music: "https://files.catbox.moe/ppp8dt.mp3"},
    {img: "takeabite_beabadoobee.png",
    name: "Real Man",
    artist: "beabadoobee",
    music: "https://files.catbox.moe/xuig04.mp3"},
    {img: "amoeba_clairo.png",
    name: "Amoeba",
    artist: "Clairo",
    music: "https://files.catbox.moe/8fvwo0.mp3"}
]
};
//dropdown
for (let key in playlists) {
    let option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    playlistSelect.appendChild(option);
}

//change playlist
playlistSelect.addEventListener("change", (e) => {
    loadPlaylist(e.target.value);
});

//load playlist
function loadPlaylist(name) {
    currentPlaylist = playlists[name];
    song_index = 0;
    loadSong(song_index);
}

function loadSong(index) {
    clearInterval(updateTimer);
    resetValues();

    let song = currentPlaylist[index];

    currentSong.src = song.music;
    currentSong.load();

    songTitle.textContent = song.name;
    artistName.textContent = song.artist;

    coverArt.style.backgroundImage = "url(" + song.img + ")";
    coverArt.style.backgroundSize = "cover";

    updateTimer = setInterval(seekUpdate, 1000);
    currentSong.onended = nextSong;
}

function resetValues() {
    currentTime.textContent = "00:00";
    songLength.textContent = "00:00";
    seekSlider.value = 0;
}

function playpauseSong() {
    if (!isPlaying) playSong();
    else pauseSong();
}

function playSong() {
    currentSong.play();
    isPlaying = true;
}

function pauseSong() {
    currentSong.pause();
    isPlaying = false;
}

function nextSong() {
    if (song_index < currentPlaylist.length - 1) {
        song_index++;
    } else {
        song_index = 0;
    }
    loadSong(song_index);
    playSong();
}

function prevSong() {
    if (song_index > 0) {
        song_index--;
    } else {
        song_index = currentPlaylist.length - 1;
    }
    loadSong(song_index);
    playSong();
}

function seekTo() {
    let seekto = currentSong.duration * (seekSlider.value / 100);
    currentSong.currentTime = seekto;
}

function seekUpdate() {
    if (!isNaN(currentSong.duration)) {
        let seekPosition = currentSong.currentTime * (100 / currentSong.duration);
        seekSlider.value = seekPosition;

        let currentMins = Math.floor(currentSong.currentTime / 60);
        let currentSecs = Math.floor(currentSong.currentTime % 60);
        let duration_ofMins = Math.floor(currentSong.duration / 60);
        let duration_ofSecs = Math.floor(currentSong.duration % 60);

        if (currentSecs < 10) currentSecs = "0" + currentSecs;
        if (duration_ofSecs < 10) duration_ofSecs = "0" + duration_ofSecs;

        currentTime.textContent = currentMins + ":" + currentSecs;
        songLength.textContent = duration_ofMins + ":" + duration_ofSecs;
    }
}

// ===== INIT =====
loadPlaylist(Object.keys(playlists)[0]);
