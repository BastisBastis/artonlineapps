import Phaser from "phaser"

import Slider from "../objects/Slider"

import BirdSpritesheet from '../assets/bird.png'
import CloudImage from "../assets/clouds.jpg"

const fontColor = "#fff"
const fontColorNum = 0x454545;
const fontColorDeselected = "#ababab"
const font= "Segoe UI"

export default class Menu extends Phaser.Scene {
  
  constructor () {
    super("menu")
  }
  
  preload() {
    
    
    this.load.spritesheet("bird", BirdSpritesheet, { frameWidth: 128, frameHeight: 128 });
    this.load.image("clouds",CloudImage)
    
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
  
  create(data) {
    
    
    //test
    
    
    
    const cam=this.cameras.main;
    cam.setBackgroundColor("#bbbbff")
    
    const bg = this.add.image(0,0,"clouds").setOrigin(0,0);
    bg.setScale(cam.width/bg.width)
    
    this.bird=this.add.sprite(-50,cam.centerY,"bird",0)
    this.bird.setScale(0.5).setAlpha(0.5)
    this.anims.create({
      key:"fly",
      frames: this.anims.generateFrameNumbers("bird", {frames: [0,1,1,2,3,2]}),
      frameRate: 32,
      repeat:-1
    });
    
    this.bird.play("fly")
    
    
    
    this.options= {sensitivity:0.99}
    
    
    
    
    this.labels=[];
    
    this.showMain();
    
    
    
  }
  
  clear() {
    this.labels.forEach(label=>label.destroy());
    this.labels=[];
  }
  
  addLabel(x,y,text,size, color=fontColor) {
    const label = this.add.text(
        x, 
        y, 
        text, 
        { 
          fontFamily: 'Exo',
            fontSize: size+'px',
          //font: size+"px "+font, 
          fill: color,
          stroke:"#000",
          strokeThickness:3
        }
      );
      this.labels.push(label);
      label.setOrigin(0.5,0.5)
      return label;
  }
  
  showMain() {
    this.clear();
    const cam=this.cameras.main;
    
    this.addLabel(cam.centerX,cam.height/4,"Pitchy Bird",80).setShadow(5, 5, "#454545", 1, false, true)//idth(cam.width);
    
    this.addLabel(cam.centerX,cam.centerY,"Spela",50).setInteractive().on("pointerdown",()=>this.start(this.options))
    
    this.addLabel(cam.centerX,cam.height*0.75,"Inställningar",50).setInteractive().on("pointerdown",()=>this.showSettings())
  }
  
  showSettings() {
    this.clear();
    const cam=this.cameras.main;
    
    this.addLabel(cam.centerX,cam.height/6,"Känslighet:",50);
    
    const sensitivityLabel=this.addLabel(cam.centerX,cam.height*0.7,"",50);
    
    const setSensitivity=(value)=>{
      
      this.options.sensitivity=Math.round(value*1000)/1000
      sensitivityLabel.text=this.options.sensitivity
      //alert()
    }
    
    const slider = new Slider(
      this,
      cam.width/2,
      cam.centerY,
      cam.width*2/3,
      0.9,
      1.0,
      0.99,
      ((val)=>setSensitivity(val)),
      2,
      fontColor,
      fontColor,
      10,
      50)
      
    
    this.labels.push(slider)
    
    slider.setValue(this.options.sensitivity)
    
    const indicator=this.add.circle(cam.centerX,cam.height*0.35,15,0xff0000)
    this.labels.push(indicator)
    
    this.game.noteDetector.callback=(res)=>{
      
      indicator.setFillStyle(res.clarity>this.options.sensitivity?0x00ff00:0xff0000,1);
    }
    this.game.noteDetector.startDetecting();
    
    this.addLabel(cam.centerX,cam.height-40,"Tillbaka",40).setInteractive().on("pointerdown",()=>{
      this.game.noteDetector.callback=()=>false;
      this.showMain();
    });
  }
  
  
  start() {
    try {
      
    this.scene.start("game",this.options)
    } catch (e) {alert(e)}
  }
  
  resetBird() {
    this.bird.x=-50
    this.bird.y=Math.random()*this.cameras.main.height;
  }
  
  update(time,delta) {
    this.bird.x+=delta/8;
    if (this.bird.x>this.cameras.main.width+50)
      this.resetBird()
  }
}