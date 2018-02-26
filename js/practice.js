var tempo = 90;            // Initial metronome tempo
var paused = true;		   // Play/pause state
var metronomeLeft = true;  // Boolean for metronome arm position
var rhythm = "consistent"; // The rhythm type
var repetitions = 5;       // Number of ticks before speeding up
var increment = 5;         // How many BPMs the metronome speeds up by
var tempoAccel = tempo;	   // Temporary tempo for acceleration
var count = 0;			   // Helper variable for acceleration
var interval;
var timeout;
var click = new Audio('res/metronome/click.wav');
var currSelScale = document.getElementsByClassName("selected")[0];
var currSelLevel = document.getElementsByClassName("selected-level")[0];


// Initialize the progress page
function init() {
	document.getElementById("bpm").value = tempo.toString();
	selectRhythm(rhythm);
};

// Play/pause button is pressed for metronome
function metronome() {
	var playPause = document.getElementById("playPause");
	paused = !paused;
	if (paused) {
		playPause.src = "res/play.png";
		document.getElementById("metronome").src = "res/metronome/metronome.png";
		clearer();
	} else {
		playPause.src = "res/pause.png";
		playerTime = document.getElementById("player-time");
		startMetronome();
	}
}

// Select the button with corresponding id
function selectRhythm(id) {
	document.getElementById(id).style.color = "white";
	document.getElementById(id).style.backgroundColor = "green";
}

// Deselect the button with corresponding id
function deselectRhythm(id) {
	document.getElementById(id).style.color = "black";
	document.getElementById(id).style.backgroundColor = "#fefefe";
}

// Switch the rhytm type for a newly defined one
function switchRhythm(newRhythm){
	if (rhythm != newRhythm) {
		deselectRhythm(rhythm);
		selectRhythm(newRhythm);
		rhythm = newRhythm;
	}
	if (!paused) {startMetronome()};
}

// Maps saved rhythm to metronome and plays it
function startMetronome() {
	clearer();
	switch(rhythm) {
    	case 'consistent':
        	consistent();
   	        break;
   	    case 'acceleration':
  	        acceleration();
   	        break;
  	     case 'subdivision':
       	    subdivision();
   	        break;
    	default:
	}
}

// Metronome action on each swing
function tick() {
	frame = metronomeLeft ? "metronome_left" : ("metronome_right");
	document.getElementById("metronome").src = "res/metronome/" + frame + ".png";
	metronomeLeft = !metronomeLeft;
	click.play();
}

// Steady beating
function consistent() {
	interval = setInterval(function(){
		tick();
	}, 60000/tempo);
}

// Gradually gets faster
function acceleration() {
	tick();
	if (count > repetitions) {
		tempoAccel += increment;
		document.getElementById("bpm").value = tempoAccel.toString();
		count = 0;
	}
	count++;
	timeout = setTimeout(function(){
		acceleration();
	}, 60000/tempoAccel);
}

// Divided into swing
function subdivision() {
	interval = setInterval(function(){
		tick();
		timeout = setTimeout(function(){
			tick();
		}, 90000/tempo);
	}, 120000/tempo);
}

// Clear intervals and timeouts
function clearer() {
	clearInterval(interval);
	clearTimeout(timeout);
	tempoAccel = tempo;
	count = 0;
}

// function scalechange(){
// 	var scale = document.getElementById("scale-notes");
// 	scale.src = 'res/scales/g_major.png';
// }

init();
