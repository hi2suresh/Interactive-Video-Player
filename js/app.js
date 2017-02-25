$(document).ready(function(){
//Create a new media element player
const player = new MediaElementPlayer('#my_video', {    
         pluginPath: 'js/js-webshim/minified/shims',
         startLanguage: 'en',
         hideCaptionsButtonWhenEmpty : false,
         success: function (mediaElement, originalNode) {
//             mediaElement.play();
         }
     });

const divTranscript = document.getElementById('transcript');
const videoElement = player.$media[0];
const textTrack = videoElement.textTracks[0];
let previouslyActiveCueId = '1';
const cueStartTimes = {};

//store the start times of text cues
setTimeout(function () {
    for (let i = 1; i < textTrack.cues.length; i++) {
        cueStartTimes[i.toString()] = textTrack.cues[i - 1].startTime;
    }
}, 200);

textTrack.addEventListener('cuechange', function () {
    if (this.activeCues.length === 1) {
        const currentlyActiveCueId = this.activeCues[0].id;
        //Make the previously highlighted element unhighlight
        document.getElementById(previouslyActiveCueId).style.color = 'black';
        //Hightlight the active cue wth blue color
        document.getElementById(currentlyActiveCueId).style.color = 'blue';
        previouslyActiveCueId = currentlyActiveCueId;
    }
});

//Change the video time (current time) based on the clicked span item
divTranscript.addEventListener('click', function(event){
 if(event.target.tagName === 'SPAN'){
     videoElement.currentTime = cueStartTimes[event.target.id];
 }
});
    
});