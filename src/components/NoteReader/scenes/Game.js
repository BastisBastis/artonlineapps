import Phaser from "phaser";

//Objects
import Note from "../objects/Note"
import Staff from "../objects/Staff"

//Images
import StaffImage from "../assets/staff.png"
import GClefImage from "../assets/gclef.png"
import FClefImage from "../assets/fclef.png"
import CClefImage from "../assets/cclef.png"
import NoteImage from "../assets/note.png"
import FlatImage from "../assets/flat.png"
import SharpImage from "../assets/sharp.png"
import PaperImage from "../assets/paper2.jpg"



//Libraries and stuff
import NoteDetector from "../../../objects/NoteDetector"

console.error=console.log;

const fontColor = "#454545"
const fontColorNum = 0x454545;

export default class Game extends Phaser.Scene {
  constructor () {
    super("game");
    
  }
  
  preload() {
    
    
    this.load.image("staff", StaffImage);
    this.load.image("gclef", GClefImage);
    this.load.image("fclef", FClefImage);
    this.load.image("cclef", CClefImage);
    this.load.image("note", NoteImage);
    this.load.image("sharp", SharpImage);
    this.load.image("flat", FlatImage);
    this.load.image("paper", PaperImage);
    
  }
  
  create (data={options:{}}) {
    //try {
    this.options=data.options;
    this.points=0;
    this.lives=3;
    this.level=0;
    this.levelSteps=5;
    this.levelCounter=this.levelSteps;
    this.cheat = false;
    
    this.game.noteDetector.callback=(res)=>{this.noteDetected(res)};
    //this.game.noteDetector.active=true;
    if (!this.game.noteDetector.active)
      this.game.noteDetector.startDetecting();
    
    this.cameras.main.setBackgroundColor('#bbbbff');
    this.add.image(0,0,"paper").setOrigin(0,0)
    this.pointsLabel = this.add.text(
        this.cameras.main.width*1/4, 
        20, 
        "Poäng: "+this.points, 
        { 
          font: "40px Arial", 
          fill: fontColor 
        }
      );
    this.livesLabel = this.add.text(
        this.cameras.main.width*3/4, 
        20, 
        "",
        { 
          font: "40px Arial", 
          fill: fontColor 
        }
      );
    this.displayLives()
    
      
    this.staffHeight=this.cameras.main.height*0.3
    

    const staff = new Staff(this,this.cameras.main.centerX,this.cameras.main.centerY,this.cameras.main.width,this.staffHeight,data.options.clef)
    
    this.add.text(this.cameras.main.centerX,this.cameras.main.height-50,"Fuska!", { 
          font: "40px Arial", 
          fill: "#ffffff" 
        }).setOrigin(0.5,0.5).setInteractive().on("pointerdown",()=>this.cheat=true).setVisible(false);
    this.noteLabel=this.add.text(this.cameras.main.width-100,this.cameras.main.height-50,"?",{ 
          font: "40px Arial", 
          fill: "#ffffff" 
        }).setVisible(false);;
    
    //const clef = this.add.image(50,this.cameras.main.centerY,"gclef");
    //clef.setScale(0.2);
    
    this.killX=170;
    this.centTolerance= data.options.centTolerance || 50;
    this.clarityTolerance= data.options.clarityTolerance || 0.95;
    
    this.noteOptions={
      minIndex:!isNaN(data.options.minNote)? data.options.minNote : -8,
      maxIndex:!isNaN(data.options.maxNote)? data.options.maxNote : 8,
      flats:data.options.flats || [0,3,6],
      sharps:data.options.sharps || [4,1,5],
      lineGap:29,
      clef:data.options.clef || "g",
      transposition:data.options.transposition || 0,
    }
    
    console.log(this.noteOptions.maxIndex)
    this.nextNote();
    //this.note=Note.fromIndex(this,11,-1)
    
    
    //this.noteDetector = new NoteDetector((res)=>{this.noteDetected(res)});
    //} catch (e) {alert(e)}

  }
  
  noteDetected(res) {
    //console.log(res.note)
    if (this.noteLabel!==undefined) {
      if (res.clarity>=this.clarityTolerance)
        if (Math.abs(res.cents)<=this.centTolerance) {
          this.noteLabel.setFill("#00ff00");
        } else {
          this.noteLabel.setFill("#ff0000");
      } else {
          this.noteLabel.setFill("#ffffff");
      }
      
      this.noteLabel.text=res.note
      //console.log("hm")
      }
    
    if ((this.note && res.noteNumber==this.note.noteNumber && Math.abs(res.cents)<=this.centTolerance) || this.cheat) {
      this.addPoint();
      this.nextNote();
      this.cheat=false;
    }
    
    
  }
  
  addPoint(point=1) {
    this.points+=point;
    this.pointsLabel.text="Poäng: "+this.points;
    this.levelCounter--;
    if (this.levelCounter<1) {
      this.level++;
      this.levelCounter=this.levelSteps;
    }
  }
  
  loseLife() {
    this.lives--;
    this.displayLives();
    if (this.lives<=0) {

      this.game.noteDetector.callback=()=>false;
      this.scene.start("gameOver",{points:this.points,options:this.options})
      

    }
  }
  
  displayLives() {
    this.livesLabel.text="Liv: "+this.lives;
  }
  
  nextNote () {

    if (this.note)
      this.note.dest();

    try {
    this.note = Note.random(this,this.noteOptions);
    } catch (err) {alert(err)}
  }
  
  update(time,delta) { 
    const speed = 0.08+0.01*Math.pow(this.level,1.5);
    
    const dx = -speed*delta
    if (this.note) {
      if (this.note.x<this.killX) {
        this.nextNote();
        this.loseLife()
      }
      this.note.move(dx);
    }
  }
  
}
