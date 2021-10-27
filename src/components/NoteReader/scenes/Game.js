import Phaser from "phaser";

//Objects
import Note from "../objects/Note"

//Images
import StaffImage from "../assets/staff.png"
import GClefImage from "../assets/gclef.png"
import NoteImage from "../assets/note.png"
import FlatImage from "../assets/flat.png"
import SharpImage from "../assets/sharp.png"

//Libraries and stuff
import NoteDetector from "../../../objects/NoteDetector"

export default class Game extends Phaser.Scene {
  constructor () {
    super("Game");
    this.points=0;
    this.lives=2;
    this.level=0;
    this.nd =new NoteDetector((res)=>{this.noteDetected(res)})
  }
  
  preload() {
    
    
    this.load.image("staff", StaffImage);
    this.load.image("gclef", GClefImage);
    this.load.image("note", NoteImage);
    this.load.image("sharp", SharpImage);
    this.load.image("flat", FlatImage);
    
  }
  
  create () {
    this.cameras.main.setBackgroundColor('#bbbbff');
    this.pointsLabel = this.add.text(
        50, 
        50, 
        "Poäng: "+this.points, 
        { 
          font: "40px Arial", 
          fill: "#ffffff" 
        }
      );
    this.livesLabel = this.add.text(
        50, 
        100, 
        "Liv: "+this.lives, 
        { 
          font: "40px Arial", 
          fill: "#ffffff" 
        }
      );
    
      
    this.staffHeight=this.cameras.main.height*0.3
    
    const bg = this.add.image(this.cameras.main.centerX,this.cameras.main.centerY,"staff");
    const scaleX = this.cameras.main.width / bg.width
    const scaleY = this.staffHeight / bg.height
    
    bg.setScale(scaleX,scaleY)
    
    const clef = this.add.image(50,this.cameras.main.centerY,"gclef");
    clef.setScale(0.2);
    
    this.killX=150;
    this.noteOptions={
      minIndex:-8,
      maxIndex:8,
      flats:[0,3,6],
      sharps:[4,1,5],
    }
    this.nextNote();
    //this.note=Note.fromIndex(this,11,-1)
    console.log(1)
    const setParameters=res=>{
      console.log(res)
    }
    
    //this.noteDetector = new NoteDetector((res)=>{this.noteDetected(res)});

  }
  
  noteDetected(res) {
    //console.log(res)
    if (this.pointsLabel)
      this.pointsLabel.text=res.note
    
    if (res.noteNumber===this.note.noteNumber) {
      this.addPoint();
      this.nextNote();
    }
    
    
  }
  
  addPoint(point=1) {
    this.points+=point;
    this.pointsLabel.text="Poäng: "+this.points;
  }
  
  loseLife() {
    this.lives--;
    this.livesLabel.text="Liv: "+this.lives;
  }
  
  nextNote () {
    if (this.note)
      this.note.destroy();
    try {
    this.note = Note.random(this,this.noteOptions);
    } catch (err) {alert(err)}
  }
  
  update(time,delta) {
    const speed = 0.1;
    const dx = -speed*delta
    if (this.note) {
      if (this.note.x<this.killX) {
        //Lose life
        this.nextNote();
      }
      this.note.move(dx);
    }
  }
  
}