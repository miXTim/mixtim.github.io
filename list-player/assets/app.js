const previous = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const artist = document.querySelector('#artist');
const title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
const slider = document.querySelector('#duration_slider');
const track_image = document.querySelector('#track_image');
const auto_play = document.querySelector('#auto');
const current = document.querySelector('.current');
const duration = document.querySelector('#duration');
const time = document.querySelector('#time');
const present = document.querySelector('#present');
const total = document.querySelector('#total');
const random_icon = document.querySelector('#randomIcon');
const bg = document.querySelector('.main');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;
let isRandom = false;

//create audio Element
let track = document.createElement('audio');


//All songs list
const All_song = [
   {
     name: "Variatio 3 a 1 Clav. Canone all Unisuono",
     path: "assets/music/1.mp3",
     img: "assets/img/OGV-CD2.jpg",
     singer: 'Kimiko Ishizaka - J.S. Bach: "Open" Goldberg Variations, BWV 988 (Piano)'
   },
   {
     name: "Variatio 11 a 2 Clav.",
     path: "assets/music/2.mp3",
     img: "assets/img/cover.jpg",
     singer: 'Kimiko Ishizaka - J.S. Bach: "Open" Goldberg Variations, BWV 988 (Piano)'
   },
   {
     name: "Variatio 13 a 2 Clav.",
     path: "assets/music/3.mp3",
     img: "assets/img/OGV-CD2.jpg",
     singer: 'Kimiko Ishizaka - J.S. Bach: "Open" Goldberg Variations, BWV 988 (Piano)'
   },
   {
     name: "Variatio 19 a 1 Clav.",
     path: "assets/music/4.mp3",
     img: "assets/img/cover.jpg",
     singer: 'Kimiko Ishizaka - J.S. Bach: "Open" Goldberg Variations, BWV 988 (Piano)'
   },
   {
     name: "Variatio 25 a 2 Clav.",
     path: "assets/music/5.mp3",
     img: "assets/img/OGV-CD2.jpg",
     singer: 'Kimiko Ishizaka - J.S. Bach: "Open" Goldberg Variations, BWV 988 (Piano)'
   },
   {
     name: "Variatio 30 a 1 Clav. Quodlibet",
     path: "assets/music/6.mp3",
     img: "assets/img/cover.jpg",
     singer: 'Kimiko Ishizaka - J.S. Bach: "Open" Goldberg Variations, BWV 988 (Piano)'
   }
];
/*** screen.orientation.lock("portrait"); ***/
// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();
	
	track.src = All_song[index_no].path;
	title.textContent = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
	artist.textContent = All_song[index_no].singer;
  track.load();

	timer = setInterval(range_slider ,1000);
	total.textContent = All_song.length;
	present.textContent = index_no + 1;
	bg.style.setProperty('--bgAfterBackground', "url(" + track_image.src + ")");
}

load_track(index_no);
let lastVal = track.volume;
let lastVol = volume_show.textContent;


// mute sound function
function mute_sound(){
	if(track.volume != 0) {
		track.volume = 0;
		volume.value = 0;
		volume_show.textContent = 0;
	} else {	// reinicia el volumen
		track.volume = lastVal;
		volume.value = lastVol;
		volume_show.textContent = lastVol;
	}
}


// checking.. the song is playing or not
function justplay(){
 	if(Playing_song==false){
 		playsong();
 	}else{
 		pausesong();
 	}
	current.style.opacity = '1';
}

// reset song slider
function reset_slider(){
 	slider.value = 0;
}

function inert(){
	random_icon.style.borderColor = "#0000";
}
// select random song
function random_song(){
 	isRandom? pauseRandom() : playRandom();
	inert();
}
function playRandom(){
 	isRandom = true;
	random_icon.style.background = "#AF2E1B";
	next_song();
}
function pauseRandom(){
 	isRandom = false;
	random_icon.style.background = "#3B4B59";
}

// play song
function playsong(){
  track.play();
	duration.textContent = secondsToString(track.duration);
  Playing_song = true;
  play.innerHTML = '<svg class=\"xl\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#icon-pause\"></use></svg>';
	play.style.background = "#AF2E1B";
	play.parentNode.dataset.tooltip = "Pause";
	current.style.opacity = '1';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<svg class=\"xl\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#icon-play\"></use></svg>';
	play.style.background = "#3B4B59";
	play.parentNode.dataset.tooltip = "Play";
}

// next song
function next_song(){
	if(index_no < All_song.length - 1 && isRandom === false){
		index_no += 1;
	}else if(index_no < All_song.length - 1 && isRandom === true){
		let random_index = Number.parseInt(Math.random() * All_song.length);
		index_no = random_index;
	}else{
		index_no = 0;
	}
	load_track(index_no);
	playsong();
}

// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
	}else{
		index_no = All_song.length - 1;
	}
	load_track(index_no);
	playsong();
}

// change volume
function volume_change(){
	volume_show.textContent = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay == 1){
		autoplay = 0;
		auto_play.style.background = "#3B4B59";
	}else{
		autoplay = 1;
		auto_play.style.background = "#AF2E1B";
	}
	inert();
}


function range_slider(){
	let position = 0;
        
	// update slider position
	if(!isNaN(track.duration)){
		position = track.currentTime * (100 / track.duration);
		slider.value =  position;
	}
   
	// function will run when the song is over
	if(track.ended){
		play.innerHTML = '<svg class=\"xl\" aria-hidden=\"true\" focusable=\"false\"><use href=\"#icon-play\"></use></svg>';
		play.style.background = "#3B4B59";
		if(autoplay == 1){
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}

// Current playtime
function secondsToString(time) {
	let hour = Math.floor(time / 3600);
	hour = (hour < 10)? '0' + hour : hour;
	let minute = Math.floor((time / 60) % 60);
	minute = (minute < 10)? '0' + minute : minute;
	let second = Math.floor(time % 60);
	second = (second < 10)? '0' + second : second;

	if(hour > 0){
		return hour + ':' + minute + ':' + second;
	}else{
		return minute + ':' + second;
	}
}

track.addEventListener("timeupdate", () => {
	if(!isNaN(track.duration)){
		time.textContent = secondsToString(track.currentTime);
		duration.textContent = secondsToString(track.duration);
	}
})

// fullscreen
let fullscreen;
const fsBtn = document.getElementById('fullscr');
fsBtn.addEventListener('click', function (e) {
	e.preventDefault();
	if (!fullscreen) {
		fullscreen = true;
		let elem = document.documentElement;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.webkitRequestFullscreen) { /* Safari */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE11 */
				elem.msRequestFullscreen();
			}
		
		fsBtn.innerHTML = '<svg class="md fullscreen" aria-hidden="true" focusable="false" id="fullscr"><use href="#icon-fullout"></use></svg>';	/* exit fullscreen */
	}
	else {
		fullscreen = false;
		document.exitFullscreen();
		fsBtn.innerHTML = '<svg class="md fullscreen" aria-hidden="true" focusable="false" id="fullscr"><use href="#icon-fullin"></use></svg>';	/* go fullscreen */
	}
});