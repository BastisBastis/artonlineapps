import Phaser from "phaser"


export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }
  
  preload() {
    var config = {
            google: {
                families: ['Exo']
            }
        };
        this.load.rexWebFont(config);
        this.load.on('webfontactive', function (fileObj, familyName) {
            console.log('font-active: ' + familyName)
        });
        this.load.on('webfontinactive', function (fileObj, familyName) {
            console.log('font-inactive: ' + familyName)
        })
  }
  
  create(gameData) {
    
    try {
    
    const cam=this.cameras.main
    
    this.add.rectangle(0,0,cam.width,cam.height,0x0,0.6).setOrigin(0,0);
    
     
   
    this.addLabel(cam.width/2,50,`Du fick ${gameData.score} poäng!`,30,0.5,0.5);
    this.addLabel(cam.width/2,100,`Topplista:`,30,0.5,0.5);
    
    
    
    this.addLabel(cam.width/2,cam.height-50,"Spela igen!",40,0.5,0.5).setInteractive().on("pointerdown",()=>{
      this.scene.start("game");
    })
    
    
    
    fetch("./pitchy/highscore?score="+gameData.score).then(res=>res.json()).then(data=>{
      const name = data.newHighscore ? prompt("Ny topplisteplacering! Vad heter du?") : false;
      if (!name) {
        this.showHighscore(data.highscore)
      } else {
        fetch('./pitchy/highscore', {
        method: 'POST',
        body: JSON.stringify({score:gameData.score,name:name}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
        })
        .then(response => {
          console.log("hupp")
          return response.json()
          })
        .then(json => {
          
            this.showHighscore(json)
        }).catch(error=>{
          console.log(error)
          alert(error)
        });
      }
    })
    
    
    } catch (e) { alert(e)}
  }
  
  addLabel (x,y,text,size=30,originX=0,originY=0,color="#fff") {
    
    return this.add.text(x,y,text,{fontFamily: 'Exo',
            fontSize: size+'px',
          //font: size+"px "+font, 
          fill: color,
          stroke:"#000",
          strokeThickness:3
          }).setOrigin(originX,originY)
    
  }
  
  
  showHighscore(highscore) {
    
    const cam=this.cameras.main
    
    
    
    for (const [i,score] of Object.entries(highscore)) {
      const color = score.player?"#88ff88":"#ffffff";
      const x=50;
      const y=140+i*40
      const size=30
      this.addLabel(x,y,score.name,size,0.0,0.5,color);
      this.addLabel(cam.width-x,y,score.score,size,1,0.5,color);
    }
  }
}