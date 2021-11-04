import {PitchDetector} from "pitchy"

const notes=["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"];

let oldDetector = false;

function noteFromPitch( frequency ) {
	const noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}
 
function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}


function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}

export default class NoteDetector {
  constructor (callback) {
    if (oldDetector) {
      oldDetector.active=false;
    }
    this.callback=callback;
    this.active=false;
    this.context=false;
    this.startDetecting();
    oldDetector=this;
    
  }
  
  stop() {
    this.active=false;
  }
  
  resumeContext() {
    if (this.context) {
      this.context.resume();
    }
  }
  
  startDetecting() {
    this.active=true;
    const audioContext = new window.AudioContext();
    this.context=audioContext;
    
    const analyserNode = audioContext.createAnalyser();
    
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let sourceNode = audioContext.createMediaStreamSource(stream);
      
      sourceNode.connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      const input = new Float32Array(detector.inputLength);
      
      
      this.updatePitch(analyserNode, detector, input, audioContext.sampleRate);
    });
  }
  
  updatePitch(analyserNode, detector, input, sampleRate) {
    try {
    if (!this.active) {
      return false;
    }
    
    analyserNode.getFloatTimeDomainData(input);
    //console.log(input)
    //this.active=false;
    const [pitch, clarity] = detector.findPitch(input, sampleRate);
    //console.log(input)
    const note=noteFromPitch(pitch)
    const cents=centsOffFromPitch(pitch,note)
  
    const noteName = notes[note%12];
    //console.log(note)
    this.callback({
      note:noteName,
      noteNumber:note,
      cents:cents,
      clarity:clarity
    })
    window.setTimeout(
      () => this.updatePitch(analyserNode, detector, input, sampleRate),
      100
    );
    } catch (err) { alert(err) }
  }
  
  
}

  
  


//export default startNoteDetector;