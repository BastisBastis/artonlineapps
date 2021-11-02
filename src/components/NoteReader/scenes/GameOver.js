import Phaser from "phaser"

console.error=console.log;

export default class GameOver extends Phaser.Scene {
  constructor(){
    super("gameOver");
  }
  
  create (data) {
    this.game.noteDetector.active=false;
    
    const cam=this.cameras.main;
    
    
    
    this.cameras.main.setBackgroundColor('#bbbbff');
    this.add.text(
        cam.centerX, 
        50, 
        "Spelet tog slut!", 
        { 
          font: "50px Arial", 
          fill: "#ffffff" 
        }
      ).setOrigin(0.5,0.5);
    this.add.text(
        cam.centerX, 
        125, 
        `Du fick ${data.points} poäng!`, 
        { 
          font: "40px Arial", 
          fill: "#ffffff" 
        }
      ).setOrigin(0.5,0.5);
      
    
    this.add.text(
        cam.centerX, 
        cam.height-125, 
        `Spela igen!`, 
        { 
          font: "40px Arial", 
          fill: "#ffffff" 
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
          fill: "#ffffff" 
        }
      ).setOrigin(0.5,0.5).setInteractive().on("pointerdown",(e)=>{
        this.scene.start("menu",{options:data.options});
      });
    
  }
  
  restart(options) {
    this.scene.start("game",{options:options});
  }
}