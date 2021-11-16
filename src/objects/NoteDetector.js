import {PitchDetector} from "pitchy"

const notes=["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"];

let oldDetector = false;



function noteFromPitch( frequency , tuning = 440) {
	const noteNum = 12 * (Math.log( frequency / tuning )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}
 
function frequencyFromNoteNumber( note ,tuning=440) {
	return tuning * Math.pow(2,(note-69)/12);
}


function centsOffFromPitch( frequency, note , tuning=440) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note , tuning))/Math.log(2) );
}

export default class NoteDetector {
  constructor (callback,autostart=false) {
    if (oldDetector) {
      oldDetector.active=false;
    }
    console.log("cobstruct")
    this.callback=callback;
    this.active=false;
    this.context=false;
    this.tuning=440
    if (autostart) {
      this.startDetecting();
    }
    //this.startDetecting();
    oldDetector=this;
    
  }
  
  offsetTuning(cents) {
    this.tuning=440 * Math.pow(2, cents / 1200);
    return this.tuning;
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
    console.log('start')
    this.active=true;
    const audioContext = new window.AudioContext();
    this.context=audioContext;
    
    const analyserNode = audioContext.createAnalyser();
    this.analyserNode=analyserNode;
    
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let sourceNode = audioContext.createMediaStreamSource(stream);
      
      sourceNode.connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      this.detector=detector;
      const input = new Float32Array(detector.inputLength);
      this.input=input
      
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
    const note=noteFromPitch(pitch, this.tuning)
    const cents=centsOffFromPitch(pitch,note, this.tuning)
  
    const noteName = notes[note%12];
    //console.log(note)
    this.callback({
      note:noteName,
      noteNumber:note,
      cents:cents,
      clarity:clarity,
      frequency:pitch
    })
    window.setTimeout(
      () => this.updatePitch(analyserNode, detector, input, sampleRate),
      100
    );
    } catch (err) { alert(err) }
  }
  
  
}

  
  


//export default startNoteDetector;