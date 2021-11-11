import Phaser from "phaser"
import PaperImage from "../assets/paper2.jpg"

const fontColor = "#454545"
const fontColorNum = 0x454545;

console.error=console.log;

export default class GameOver extends Phaser.Scene {
  constructor(){
    super("gameOver");
  }
  
  create (data) {
    this.game.noteDetector.active=false;
    
    const cam=this.cameras.main;
    this.add.image(0,0,"paper").setOrigin(0,0)
    
    
    this.cameras.main.setBackgroundColor('#bbbbff');
    this.add.text(
        cam.centerX, 
        50, 
        "Spelet tog slut!", 
        { 
          font: "50px Arial", 
          fill: fontColor 
        }
      ).setOrigin(0.5,0.5);
    this.add.text(
        cam.centerX, 
        125, 
        `Du fick ${data.points} poäng!`, 
        { 
          font: "40px Arial", 
          fill: fontColor 
        }
      ).setOrigin(0.5,0.5);
      
    
    this.add.text(
        cam.centerX, 
        cam.height-125, 
        `Spela igen!`, 
        { 
          font: "40px Arial", 
          fill: fontColor 
        }
      ).setOrigin(0.5,0.5).setInteractive().on("pointerdown",(e)=>{
        this.restart(data.options);
      });
      
    this.add.text(
        cam.centerX, 
        cam.height-50, 
        `Huvudmeny`, 
        { 
          font: "40px Arial", 
          fill: fontColor 
        }
      ).setOrigin(0.5,0.5).setInteractive().on("pointerdown",(e)=>{
        this.scene.start("menu",{options:data.options});
      });
    
  }
  
  restart(options) {
    this.scene.start("game",{options:options});
  }
}