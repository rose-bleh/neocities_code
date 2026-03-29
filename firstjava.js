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

let song_list = [
{
img: "cologne_beabadoobee.png",
name:"cologne",
artist:"beabadoobee",
music:"https://files.catbox.moe/m54tmg.mp3"
},
];
loadSong(song_index);
 
function loadSong(song_index) {
    clearInterval(updateTimer);
    resetValues();

    // load a new track
    currentSong.src = song_list[song_index].music;
    currentSong.load();

    // update details of the track
    songTitle.textContent = song_list[song_index].name;
    artistName.textContent = song_list[song_index].artist;
    coverArt.style.backgroundImage = "url(" + song_list[song_index].img + ")";
    coverArt.style.backgroundSize = "cover";

    // set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // move to the next track if the current one finishes playing 
    currentSong.onended = nextSong;
}
function resetValues(){
    currentTime.textContent = "00:00";
    songLength.textContent = "00:00";
    seekSlider.value = 0;
}
// load the first track in the tracklist
loadSong(song_index);

// checks if song is playing
function playpauseSong(){
    if (!isPlaying) playSong();
    else pauseSong();
}

// plays track when play button is pressed
function playSong(){
    currentSong.play();
    isPlaying = true;

    // replace icon with the pause icon
    //playPause.innerHTML = '';
}

// pauses track when pause button is pressed
function pauseSong(){
    currentSong.pause();
    isPlaying = false;
    //playPause.innerHTML = '';
}

// moves to the next track
function nextSong(){
    if (song_index < song_list.length - 1){
        song_index += 1;
    }else {
        song_index = 0;
    }
    loadSong(song_index);
    playSong();
}
// moves to the previous track
function prevSong(){
    if (song_index > 0) {
        song_index -= 1;
    } else {
        song_index = song_list.length-1;
    }
    loadSong(song_index);
    playSong();
}

// seeker slider
function seekTo(){
    let seekto = currentSong.duration * (seekSlider.value / 100);
    currentSong.currentTime = seekto;
}
function seekUpdate() {
    if (!isNaN(currentSong.duration)) {
        let seekPosition = currentSong.currentTime * (100 / currentSong.duration);
        seekSlider.value = seekPosition;

        // Simple time calculation
        let curMins = Math.floor(currentSong.currentTime / 60);
        let curSecs = Math.floor(currentSong.currentTime - curMins * 60);
        let durMins = Math.floor(currentSong.duration / 60);
        let durSecs = Math.floor(currentSong.duration - durMins * 60);

        if (curSecs < 10) curSecs = "0" + curSecs;
        if (durSecs < 10) durSecs = "0" + durSecs;

        currentTime.textContent = curMins + ":" + curSecs;
        songLength.textContent = durMins + ":" + durSecs;
    }
}