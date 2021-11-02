import Phaser from "phaser"

const pitchIndex= {
 "-28":23, // B2
 "-27":24, // C1
 "-26":26, // D1
 "-25":28, // E1
 "-24":29, // F1
 "-23":31, // G1
 "-22":33, // A1
 "-21":35, // B1
 "-20":36, // C
 "-19":38, // D
 "-18":40, // E
 "-17":41, // F
 "-16":43, // G
 "-15":45, // A
 "-14":47, // B
 "-13":48, // c
 "-12":50, // d
 "-11":52, // e
 "-10":53, // f
  "-9":55, // g
  "-8":57, // a
  "-7":59, // b
  "-6":60, // c1
  "-5":62, // d1
  "-4":64, // e1
  "-3":65, // f1
  "-2":67, // g1
  "-1":69, // a1
     0:71, // b1
     1:72, // c2
     2:74, // d2
     3:76, // e2
     4:77, // f2
     5:79, // g2
     6:81, // a2
     7:83, // b2
     8:84, // c3
     9:86, // d3
    10:88, // e4
    11:89, // f4
   
}

export default class Note extends Phaser.GameObjects.Sprite {
  constructor(scene,x,y,noteNumber,accidental,ledgerLines,lineGap) {
    super(scene,x,y,"note");
    try {
    this.scale=lineGap*0.26/30;
    this.noteNumber=noteNumber;
    this.scene=scene;
    console.log(noteNumber)
    
    scene.add.existing(this);
    
    this.accidental = this.getAccidental(accidental,lineGap);
    
    this.ledgerLines=ledgerLines;
    //console.log(noteNumber)
  } catch (e) { alert(e)}
  }
  
  getAccidental(accIndex) {
    
    if (accIndex !== 0) {
      const accidentalData = {
        "-1":{
          texture:"flat",
          scale:0.05,
          dx:-45,
          dy:-10,
        },
        1:{
          texture:"sharp",
          scale:0.04,
          dx:-45,
          dy:0,
        }
      }[accIndex];
      const accidental = this.scene.add.sprite(
        this.x+accidentalData.dx,
        this.y+accidentalData.dy,
        accidentalData.texture
        );
      accidental.setScale(accidentalData.scale);
        return accidental
    }
    return false;
    
  }
  
  static getLedgerLines(scene, x,index,lineGap=29,lineThickness=2) {
    const f= lineGap/29;
    
    const w = 50*f;
    const dx = 25*f;
    const dy = lineGap/2;
    const extra=4*f;
    const thickness=lineThickness
    const lines =[];
    for (let i = 6; i<=index; i+=2) {
      const y = scene.cameras.main.centerY-dy*i;
      const line = scene.add.line(x,y,-w/2-extra,0,w/2+extra,0,0x000000,1).setOrigin(0.0,0.5);
      line.setLineWidth(thickness)
      lines.push(line)
    }
    
    for (let i = -6; i>=index; i-=2) {
      const y = scene.cameras.main.centerY-dy*i;
      const line = scene.add.line(x,y,-w/2-extra,0,w/2+extra,0,0x000000,1).setOrigin(0.0,0.5);
      line.setLineWidth(thickness)
      lines.push(line)
    }
    
    return lines;
    
  }
  
  static fromIndex(scene,index,accidental,lineGap,lineThickness=2,clef="g") {
    
    const x=scene.cameras.main.width+30 + Math.abs(accidental)*30;
    const dy=lineGap*0.5//14.5;
    const y = scene.cameras.main.centerY-index*dy-dy*0.05;
    
    //rewrite to only allow provided accidentsals in the random roll
    
    const clefAdjust = {g:0,f:-12,c:-6}[clef]
      
    //const realIndex=index*1+clefAdjust
    const noteNumber = pitchIndex[Number(index) + clefAdjust]+accidental;
    
    
    const ledgerLines=Note.getLedgerLines(scene,x,index,lineGap,lineThickness);
    
    
    return new Note(scene,x,y,noteNumber,accidental,ledgerLines,lineGap);
  }
  
  static random(scene,{
    flats=[],
    sharps=[],
    minIndex=-11,
    maxIndex=11,
    lineGap=30,
    clef="g",
    lineThickness
  }={}) {
    
    const clefAdjust = {g:0,f:2,c:1}[clef];
    //alert(clef)
    
    const index = Math.floor(Math.random()*(maxIndex-minIndex+1)+minIndex);
    
    
    
    
    let naturalIndex=index+clefAdjust;
    while (naturalIndex<0)
      naturalIndex+=7;
    
    const availableAcc = [0];
    if (flats.includes(naturalIndex%7))
      availableAcc.push(-1);
    if (sharps.includes(naturalIndex%7))
      availableAcc.push(1);
    const accidental=availableAcc[Math.floor(Math.random()*availableAcc.length)]
    
    //index-=clefAdjust;
      
    return Note.fromIndex(scene,index,accidental,lineGap,lineThickness,clef);
  }
  
  dest() {
    if (this.accidental)
      this.accidental.destroy();
    this.ledgerLines.forEach(line=>line.destroy())
    this.destroy();
  }
  
  setIndex(index) {
    for (const line of this.ledgerLines) {
      line.destroy()
    }
    const dy=lineGap*0.4833//14.5;
    const y = scene.cameras.main.centerY-index*dy-dy*0.05;
    this.y=y;
    if (this.accidental) {
      //won't work well with flats!
      this.accidental.y=this.y
    }
  }
  
  setX(x) {
    this.x =x;
    if (this.accidental)
      this.accidental.x =x;
    for (const line of this.ledgerLines)
      line.x=this.x;
    return this
  }
  
  move(dx) {
    this.x+=dx;
    if (this.accidental)
      this.accidental.x+=dx;
    for (const line of this.ledgerLines)
      line.x=this.x;
  }
}