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

console.error=console.log;

export default class Game extends Phaser.Scene {
  constructor () {
    super("Game");
    
  }
  
  preload() {
    
    
    this.load.image("staff", StaffImage);
    this.load.image("gclef", GClefImage);
    this.load.image("note", NoteImage);
    this.load.image("sharp", SharpImage);
    this.load.image("flat", FlatImage);
    
  }
  
  create () {
    this.points=0;
    this.lives=1;
    this.level=0;
    
    this.game.noteDetector.callback=(res)=>{this.noteDetected(res)};
    
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
        "",
        { 
          font: "40px Arial", 
          fill: "#ffffff" 
        }
      );
    this.displayLives()
    
      
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
    
    
    //this.noteDetector = new NoteDetector((res)=>{this.noteDetected(res)});

  }
  
  noteDetected(res) {
    //console.log(res.note)
    if (this.pointsLabel!==undefined) {
      //this.pointsLabel.text=res.note
      //console.log("hm")
      }
    
    if (this.note && res.noteNumber==this.note.noteNumber) {
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
    this.displayLives();
    if (this.lives<=0) {
      
      this.scene.start("gameOver",{points:this.points})
      
    }
  }
  
  displayLives() {
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
        this.loseLife()
        this.nextNote();
      }
      this.note.move(dx);
    }
  }
  
}