import Phaser from "phaser"

import BirdSpritesheet from "../assets/bird.png"
import PipeImage from "../assets/pipe.png"
import CloudImage from "../assets/clouds.jpg"

import Player from '../objects/Player'
import PipePair from "../objects/PipePair"

export default class Game extends Phaser.Scene {
  
  constructor () {
    super("game")
  }
  
  preload() {
    
    this.load.spritesheet("bird", BirdSpritesheet, { frameWidth: 128, frameHeight: 128 });
    this.load.image("pipe",PipeImage)
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
  
  create({sensitivity=0.99}={}) {
    //console.log(data)
    //const sensitivity=data.sensitivity || 0.99;
    /*
    
    */
    
    const cam=this.cameras.main;
    cam.setBackgroundColor("#bbbbff")
    const bg = this.add.image(0,0,"clouds").setOrigin(0,0);
    bg.setScale(cam.width/bg.width)
    
    
    
    this.player=new Player(this)
    this.pipes = this.add.group();
    this.physics.add.collider(this.player,this.pipes,(a,b)=>{
      this.physics.pause()
      this.player.die()
      this.game.noteDetector.active=false;
      this.scene.launch("gameover",{score:this.score})
    })
    
    const pipeOpening=200
    this.pipePairs=[
       PipePair.random(this,pipeOpening,this.pipes),
       PipePair.random(this,pipeOpening,this.pipes,1.4),
       PipePair.random(this,pipeOpening,this.pipes,1.8)
    ]
    
    
    this.score=0;
    this.scoreLabel=this.add.text(35,70,0,{
          fontFamily: 'Exo',
          fontSize: '40px',
          //font: size+"px "+font, 
          fill: "#fff",
          stroke:"#000",
          strokeThickness:3
        });
    
    this.shouldFlap=false;
    this.game.noteDetector.callback=res=>{
      //this.scoreLabel.text=res.clarity
      if (res.clarity>sensitivity) {
        this.shouldFlap=true;
      }
      else {
        this.shouldFlap=false;
      }
    }
    if (!this.game.noteDetector.active)
      this.game.noteDetector.startDetecting();
      
    console.log(sensitivity)
  }
  
  increaseScore() {
    this.score++;
    this.scoreLabel.text=this.score
  }
  
  update(time,delta) {
    if (this.input.activePointer.isDown) {
      this.player.flap(delta)
    }
    if (this.shouldFlap) {
      
      //this.shouldFlap=false;
      this.player.flap(delta)
    }
    this.pipePairs.forEach(pipePair=>{
      pipePair.update()
      if (pipePair.x<this.player.x  && pipePair.prevX >= this.player.x) {
        this.increaseScore()
        
      }
    })
  }
  
}