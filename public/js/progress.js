var i;
var BadgeArray = [
    "Level 1 Badge",
    "Level 2 Badge",
    "Level 3 Badge",
    "Level 4 Badge",
    "Speedster Badge",
    "100% Accuracy Badge",
    "Beethoven Badge"
];

var poorColor = "#e9e9f0";
var goodColor = "#FFF5EE";
var greatColor = "#7BCCB5";

var colorMapping = [poorColor, goodColor, greatColor];

var keyMapping = ["C", "G", "D", "A", "E", "B", "F#", "C#", "Ab", "Eb", "Bb", "F"];
var scaleMapping = ["Major", "Minor", "Harmonic", "Melodic", "Chromatic", "Pentatonic",
                    "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

function init(){
    // Check if logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            signedIn = true;
            document.getElementById('sign-out').addEventListener('click', signOut, false);
        } else {
            signedIn = false;
            window.location.href="splash.html";
        }
    });
  //
  //   for (i=0;i<11;i+){
  //     for(j=0;j<12;j++){
  //       var scale_quote = keyMapping[i] + "_" + scaleMapping[j];
  //       var scale = getElementById(scale_quote);
  //       element.addEventListener('click', clickHandler);
  // function clickHandler(){
  //   for (i=0;i<11;i+){
  //       for(j=0;j<12;j++){
  //         var b = document.getElementById(scale_quote).value;
  //         window.location.href="individualProgress.html?scale="+ encodeURIComponent(b);
  //       }
  //     }
  //   }
  // }}
    for (i=0; i<scaleMapping.length; i++) {
        var scaleName = scaleMapping[i];
        var scale = document.getElementById(scaleName);
        for(j = 2; j < scale.childNodes.length; j++){
            scaleChild = scale.childNodes[j];
            if(scaleChild.nodeName == 'TD'){
                // Binned Color Function
                scaleChild.style.backgroundColor = colorMapping[Math.floor(3*Math.random())];
                //

                //Gradient Functoin
                // var red = Math.floor(255*Math.random());
                // var green = 255-red;
                // var colr = "rgb(" + red.toString() + ", " + green.toString() + ", 0)";
                // scaleChild.style.backgroundColor = colr;
                // console.log(colr);
            }
        }
    }
    	var modal = document.getElementById("myModal");
    	console.log(modal);
    	var btns = [];
    	var rects = [];
    	for (i=1; i<8; i++) {
    			btns[i] = document.getElementById(i.toString());
    			btns[i].onclick = function() {
    					var badgeInfo = event.srcElement.id;
    					var rect = document.getElementById(badgeInfo).getBoundingClientRect();
    					document.getElementById("badgeInfo").innerHTML = renderBadgeText(badgeInfo);
    					modal.style.display = "block";
    					modal.style.top = (rect.y + 65).toString() + "px";
    					modal.style.left = (rect.x - 100).toString() + "px";
    			}
    	}
    	var span = document.getElementsByClassName("close")[0];
    	span.onclick = function() {
    			modal.style.display = "none";
    	}
    	window.onclick = function(event) {
    			if (event.target == modal) {
    					modal.style.display = "none";
    			}
    	}

    renderBadgeText = function(num) {
    	return BadgeArray[num-1];
    }
};

function signOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        window.location.href="splash.html";
    }
}
window.onload = function() {
    init();
}
