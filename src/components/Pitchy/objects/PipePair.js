import Phaser from "phaser"


export default class PipePair {
  constructor (scene,y,opening,collisionGroup,xFactor=1) 
  {
    const x=scene.cameras.main.width*xFactor;
    this.x=x;
    this.prevX=x;
    const scaleX=0.6;
    const scaleY=0.75;
    this.topPipe = scene.physics.add.sprite(x,y-opening/2,"pipe").setOrigin(0,1).setScale(scaleX,scaleY).setFlipY(true);
    this.topPipe.body.setAllowGravity(false);
    this.bottomPipe=scene.physics.add.sprite(x,y+opening/2,"pipe").setOrigin(0,0).setScale(scaleX,scaleY);
    this.bottomPipe.body.setAllowGravity(false);
    this.setSpeed(75)
    this.startX=scene.cameras.main.width
    
    collisionGroup.add(this.topPipe)
    collisionGroup.add(this.bottomPipe)
    
    this.sceneHeight=scene.cameras.main.height;
    this.opening=opening
  }
  
  static random(scene,opening,collisionGroup,xFactor) {
    const cam = scene.cameras.main;
    const y = Math.floor(Math.random()*(cam.height-opening)+opening/2);
    return new PipePair(scene,y,opening,collisionGroup,xFactor)
  }
  
  setSpeed(speed) {
    this.topPipe.setVelocityX(-speed)
    this.bottomPipe.setVelocityX(-speed)
  }
  
  reset() {
    this.topPipe.setX(this.startX)
    this.bottomPipe.setX(this.startX)
    const y = Math.floor(Math.random()*(this.sceneHeight-this.opening)+this.opening/2);
    this.topPipe.setY(y - this.opening/2)
    this.bottomPipe.setY(y + this.opening/2)
    
    
  }
  
  update(time,delta) {
    this.prevX=this.x;
    this.x=this.topPipe.x;
    if (this.topPipe.x<-this.topPipe.width) {
      this.opening-=5
      this.reset()
    }
  }
}