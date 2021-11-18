import Phaser from "phaser"

export default class Slider {
  constructor (scene,x,y,width,minValue=0,maxValue=1,defaultValue=0.5,onChange=(()=>false),lineThickness=2,lineColor=0x000,handleColor=0x000,handleWidth=4,handleHeight=20) {
    
    this.width=width;
    this.x=x;
    this.minValue=minValue;
    this.maxValue=maxValue;
    
    
    this.line=scene.add.line(x,y,0,0,width,0,lineColor,1).setLineWidth(lineThickness).setOrigin(0.5,0.5);
    
    this.value;
    
    this.onChange=onChange;
    
    
    this.handle=scene.add.rectangle(x, y, handleWidth, handleHeight, handleColor, 1);
    this.handle.setInteractive({
      draggable:true,
      hitArea:new Phaser.Geom.Rectangle(-handleWidth*4, 0, handleWidth*8, handleHeight),
      hitAreaCallback:Phaser.Geom.Rectangle.Contains
      }).on("drag",(p)=>{
      this.handle.x=Math.max(x-width/2, Math.min(x+width/2,p.x));
      this.updateValue();
      onChange(this.value)
    })
    this.updateValue()
  }
  
  updateValue() {
    const startX=this.x-this.width/2;
    const endX=this.x+this.width/2;
    this.value = ((this.handle.x-startX)/this.width)*(this.maxValue-this.minValue)+this.minValue
  }
  
  setValue(value) {
    this.value=value;
    const startX=this.x-this.width/2;
    const endX=this.x+this.width/2;
    
    this.handle.x= startX+this.width*((value-this.minValue)/(this.maxValue-this.minValue))
    console.log(this.handle.x)
    
    this.onChange(value)
  }
  
  destroy() {
    this.handle.destroy()
    this.line.destroy()
  }

}