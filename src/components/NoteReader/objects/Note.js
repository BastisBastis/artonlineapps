import Phaser from "phaser"

const pitchIndex= {
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
  constructor(scene,x,y,noteNumber,accidental,ledgerLines) {
    super(scene,x,y,"note");
    this.scale=0.26;
    this.noteNumber=noteNumber;
    this.scene=scene;
    scene.add.existing(this);
    
    this.accidental = this.getAccidental(accidental);
    
    this.ledgerLines=ledgerLines;
    //console.log(noteNumber)
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
  
  static getLedgerLines(scene, x,index) {
    try{
    const w = 50;
    const dx = 25;
    const dy = 14.5;
    const extra=4;
    const thickness=2;
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
    } catch (err) {alert(err)}
  }
  
  static fromIndex(scene,index,accidental,flats,sharps) {
    const x=scene.cameras.main.width+30 + Math.abs(accidental)*30;
    const dy=14.5;
    const y = scene.cameras.main.centerY-index*dy;
    
    //rewrite to only allow provided accidentsals in the random roll
    let naturalIndex=index;
    while (naturalIndex<0)
      naturalIndex+=7;
    if (accidental<0 && !flats.includes(naturalIndex%7) || accidental>0 && !sharps.includes(naturalIndex%7))
      accidental=0;
    const noteNumber = pitchIndex[index]+accidental;
    
    
    const ledgerLines=Note.getLedgerLines(scene,x,index);
    
    
    return new Note(scene,x,y,noteNumber,accidental,ledgerLines);
  }
  
  static random(scene,{
    flats,
    sharps,
    minIndex=-11,
    maxIndex=11
  }={}) {
    
    const index = Math.floor(Math.random()*(maxIndex-minIndex+1)+minIndex);
    const accidental = Math.floor(Math.random()*3-1);
    return Note.fromIndex(scene,index,accidental,flats,sharps);
  }
  
  destroy() {
    if (this.accidental !== false) {
      console.log("Amen!");
      this.accidental.destroy();
    }
    console.log(this.ledgerLines);
    this.ledgerLines.forEach(line=>line.destroy())
    super.destroy();
  }
  
  move(dx) {
    this.x+=dx;
    if (this.accidental)
      this.accidental.x+=dx;
    for (const line of this.ledgerLines)
      line.x=this.x;
  }
}
