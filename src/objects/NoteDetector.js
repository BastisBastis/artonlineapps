import {PitchDetector} from "pitchy"

const notes=["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"];


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
    this.callback=callback;
    this.active=false;
    this.startDetecting();
    
  }
  
  stop() {
    this.active=false;
  }
  
  startDetecting() {
    this.active=true;
    const audioContext = new window.AudioContext();
    
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
  }
  
  
}

  
  


//export default startNoteDetector;