import Phaser from "phaser"

export default class Staff {
  constructor (scene,x,y,width,height,clef="g",thickness=2) {
    this.scene=scene;
    this.x=x;
    this.width=width;
    this.y=y;
    this.height=height;
    this.lines=[];
    for (let i =0; i<5; i++) {
      const lineY = y-height/2+(height/4)*i
      try {
      const line=scene.add.line(x,lineY,0,0,width,0,0x000000,1).setLineWidth(thickness).setOrigin(0.5,0.5);
      this.lines.push(line);
      } catch (e) {alert(e)}
    }
    
    this.setClef(clef)
    
  }
  
  setClef(clef) {
    if (this.clef)
      this.clef.destroy();
    const clefDY={'g':0,'f':0,'c':0}[clef]
    this.clef=this.scene.add.image(this.x-this.width/2+this.height/2,this.y+clefDY,clef+"clef");
    
    const clefScale={g:(this.height*2)/this.clef.height,f:this.height/this.clef.height, c:this.height/this.clef.height}[clef] || 1;
    this.clef.setScale(clefScale);
    
  }
  
  destroy() {
    for (const line of this.lines) {
      if (line) {
        line.destroy();
      }
    }
    if (this.clef) {
      this.clef.destroy();
    }
  }
  
  getLineGap() {
    const gap = this.height/4;
    console.log(gap)
    return gap;
  }
  
}