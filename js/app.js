$(document).ready(function(){
//Create a new media element player
const player = new MediaElementPlayer('#my_video', {    
         pluginPath: 'js/js-webshim/minified/shims'
         , startLanguage: 'en',
         hideCaptionsButtonWhenEmpty : false
         , success: function (mediaElement, originalNode) {
         }
     });

const divTranscript = document.getElementById('transcript');
const videoElement = player.$media[0];
const textTrack = videoElement.textTracks[0];
let previouslyActiveCueId = '1';
const cueStartTimes = {};

//setTimeout(function () {
    for (let i = 1; i < textTrack.cues.length; i++) {
        cueStartTimes[i.toString()] = textTrack.cues[i - 1].startTime;
    }
//}, 1000);

textTrack.addEventListener('cuechange', function () {
    if (this.activeCues.length === 1) {
        const currentlyActiveCueId = this.activeCues[0].id;
        document.getElementById(previouslyActiveCueId).style.color = 'black';
        document.getElementById(currentlyActiveCueId).style.color = 'blue';
        previouslyActiveCueId = currentlyActiveCueId;
    }
});

divTranscript.addEventListener('click', function(event){
 videoElement.currentTime = cueStartTimes[event.target.id];
});
    
});