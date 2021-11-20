import Phaser from "phaser"

export default class Player extends Phaser.GameObjects.Sprite {
  
  constructor (scene) {
    const cam=scene.cameras.main;
    const x = cam.width/4;
    const y = cam.height/2;
    super(scene,x,y,"bird",0);
    this.setScale(0.75);
    scene.anims.create({
      key:"fly",
      frames: scene.anims.generateFrameNumbers("bird", {frames: [0,1,1,2,3,2]}),
      frameRate: 32,
      repeat:-1
    });
    
    this.play("fly")
    scene.physics.add.existing(this)
    this.body.setSize(150,82)
    this.body.setMaxVelocity(300,300)
    this.body.setCollideWorldBounds(true)
    scene.add.existing(this)
  }
  
  die() {
    this.anims.stop()
  }
  
  flap(delta) {
    const maxFlap=225;
    const acc=12*delta/10;
    if (this.body.velocity.y>-maxFlap) {
      //this.setVelocity(0,this.body.velocity.y-acc)
      this.body.velocity.y-=acc
    }
    
    
  }
}