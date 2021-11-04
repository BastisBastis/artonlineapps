import Phaser from "phaser"


//Objects
import Note from "../objects/Note"
import Staff from "../objects/Staff"

//Images
import GClefImage from "../assets/gclef.png"
import FClefImage from "../assets/fclef.png"
import CClefImage from "../assets/cclef.png"
import NoteImage from "../assets/note.png"

export default class Menu extends Phaser.Scene {
  
  constructor () {
    super("menu")
  }
  
  preload() {
    
    
    
    this.load.image("gclef", GClefImage);
    this.load.image("fclef", FClefImage);
    this.load.image("cclef", CClefImage);
    this.load.image("note", NoteImage);
    
    
  }
  
  create(data) {
    const cam=this.cameras.main;
    cam.setBackgroundColor("#bbbbff")
    this.options=data.options || {
      sharps:[4,1,5,2],
      flats:[0,3,6,2],
      minNote:-5,
      maxNote:5,
      clef:"g",
      transposition:0
    }
    this.labels=[];
    
    this.showMain();
    
    
  }
  
  clear() {
    this.labels.forEach(label=>label.destroy());
    this.labels=[];
  }
  
  addLabel(x,y,text,size, color="#ffffff") {
    const label = this.add.text(
        x, 
        y, 
        text, 
        { 
          font: size+"px Arial", 
          fill: color 
        }
      );
      this.labels.push(label);
      label.setOrigin(0.5,0.5)
      return label;
  }
  
  showMain() {
    this.clear();
    const cam=this.cameras.main;
    
    this.addLabel(cam.centerX,cam.height/4,"Pricka Noten",60);
    
    this.addLabel(cam.centerX,cam.centerY,"Spela",50).setInteractive().on("pointerdown",()=>this.start())
    
    this.addLabel(cam.centerX,cam.height*0.75,"Inställningar",50).setInteractive().on("pointerdown",()=>this.showSettings())
  }
  
  showSettings() {
    this.clear();
    const cam=this.cameras.main;
    
    const buttons=[
      {
        title:"Förtecken",
        callback:()=>this.showAccidentals()
      },
      {
        title:"Omfång",
        callback:()=>this.showMinMax()
      },
      {
        title:"Transponering",
        callback:()=>this.showTransposition()
      },
      {
        title:"Tillbaka",
        callback:()=>this.showMain()
      },
    ];
    
    const startY=cam.height/(buttons.length*2);
    const dy=cam.height/buttons.length;
    for (const [i,btn] of Object.entries(buttons)) {
      this.addLabel(cam.centerX,startY+dy*i,btn.title,40).setInteractive().on("pointerdown", ()=>btn.callback())
    }
  }
  
  showAccidentals() {
    this.clear();
    const cam=this.cameras.main;
    
    this.addLabel(cam.centerX,50,"Välj förtecken",50);
    this.addLabel(cam.centerX,cam.height-50,"Tillbaka",40).setInteractive().on("pointerdown",()=>this.showSettings())
    
    
    const sharpNames=[
      {i:4,name:"F#"},
      {i:1,name:"C#"},
      {i:5,name:"G#"},
      {i:2,name:"D#"},
      {i:6,name:"A#"},
      {i:3,name:"E#"},
      {i:0,name:"B#"}];
    const flatNames=[
      {i:0,name:"Bb"},
      {i:3,name:"Eb"},
      {i:6,name:"Ab"},
      {i:2,name:"Db"},
      {i:5,name:"Gb"},
      {i:1,name:"Cb"},
      {i:4,name:"Fb"}];
      
      const toggleAccidental=(label,i,collection)=>{
        if (collection.includes(i)) {
          const index=collection.indexOf(i);
          collection.splice(index,1);
          label.setFill("#888888")
        }
        else {
          collection.push(i);
          label.setFill("#ffffff")
        }
      }
    
    for (const [i,sharp] of sharpNames.entries()) {
      const dx=cam.width/7
      const x=dx*(i+0.5);
      const y=150;
      const size=40;
      
      const toggled=this.options.sharps.includes(sharp.i);
      const color = toggled ? "#ffffff" : "#888888";
      
      const label=this.addLabel(x,y,sharp.name,size,color);
      label.setInteractive().on("pointerdown",()=> {
        toggleAccidental(label,sharp.i,this.options.sharps)
      })
    }
    
    for (const [i,flat] of flatNames.entries()) {
      const dx=cam.width/7
      const x=dx*(i+0.5);
      const y=250;
      const size=40;
      
      const toggled=this.options.flats.includes(flat.i);
      const color = toggled ? "#ffffff" : "#888888";
      
      const label=this.addLabel(x,y,flat.name,size,color);
      label.setInteractive().on("pointerdown",()=> {
        toggleAccidental(label,flat.i,this.options.flats)
      })
    }
  }
  
  showMinMax() {
    
    this.clear();
    const cam=this.cameras.main;
    this.addLabel(cam.centerX,50,"Välj omfång",50);
    
    
    const staff = new Staff(this,cam.centerX,this.cameras.main.centerY,200,50,this.options.clef,1)
    this.labels.push(staff);
    
  const clefX=80
  const clefDY=85
    
    const gclefBtn = this.add.image(clefX,cam.centerY-clefDY,"gclef").setScale(0.07).setInteractive().on("pointerdown",()=>{
      staff.setClef("g")
      this.options.clef="g"
    })
   
    const cclefBtn = this.add.image(clefX,cam.centerY,"cclef").setScale(0.3).setInteractive().on("pointerdown",()=>{
      staff.setClef("c")
      this.options.clef="c"
    })
    
    const fclefBtn = this.add.image(clefX,cam.centerY+clefDY,"fclef").setScale(0.04).setInteractive().on("pointerdown",()=>{
      staff.setClef("f")
      this.options.clef="f"
    })
    
    for (const c of [gclefBtn,cclefBtn,fclefBtn]) {
      this.labels.push(c);
    }
   
    let topNote= Note.fromIndex(this,this.options.maxNote,0,staff.getLineGap(),1).setX(cam.centerX);

    
    let bottomNote= Note.fromIndex(this,this.options.minNote,0,staff.getLineGap(),1).setX(cam.centerX);
    
    
    this.addLabel(cam.width-75,150,"+",75).setInteractive().on("pointerdown",()=>{
      topNote.dest();
      this.options.maxNote++;
      topNote=Note.fromIndex(this,this.options.maxNote,0,staff.getLineGap(),1).setX(cam.centerX);
    })
    this.addLabel(cam.width-150,145,"-",75).setInteractive().on("pointerdown",()=>{
      topNote.dest();
      this.options.maxNote--;
      topNote=Note.fromIndex(this,this.options.maxNote,0,staff.getLineGap(),1).setX(cam.centerX);
      
    })
    
    this.addLabel(cam.width-75,250,"+",75).setInteractive().on("pointerdown",()=>{
      bottomNote.dest();
      this.options.minNote++;
      bottomNote=Note.fromIndex(this,this.options.minNote,0,staff.getLineGap(),1).setX(cam.centerX);
    })
    this.addLabel(cam.width-150,245,"-",75).setInteractive().on("pointerdown",()=>{
      bottomNote.dest();
      this.options.minNote--;
      bottomNote=Note.fromIndex(this,this.options.minNote,0,staff.getLineGap(),1).setX(cam.centerX);
      
    })
   
    this.addLabel(cam.centerX,cam.height-50,"Tillbaka",40).setInteractive().on("pointerdown",()=>{
      topNote.dest();
      bottomNote.dest()
      this.showSettings();
    });
  }
  
  showTransposition() {
    this.clear();
    const cam=this.cameras.main;
    this.addLabel(cam.centerX,50,"Välj transponering",50);
    
    this.addLabel(cam.centerX-50,125,"Halvtoner:",40).setOrigin(1,0.5)
    
    const transLabel=this.addLabel(cam.centerX+50,125,this.options.transposition,40)
    
    const setTransposition=(trans) => {
      this.options.transposition=trans;
      transLabel.text=this.options.transposition;
    }
    
    
    
    this.addLabel(cam.width-75,125,"+",75).setInteractive().on("pointerdown",()=>{
      setTransposition(this.options.transposition+1)
    })
    this.addLabel(cam.width-150,120,"-",75).setInteractive().on("pointerdown",()=>{
      setTransposition(this.options.transposition-1)
    })
    
    
    const instruments=[
      {
        title:"C-instrument",
        transposition:0
      },
      {
        title:"Klarinett",
        transposition:2
      },
      {
        title:"Trumpet",
        transposition:2
      },
      {
        title:"Valthorn",
        transposition:7
      },
      {
        title:"Altsaxofon",
        transposition:9
      },
      
      {
        title:"Tenorsaxofon",
        transposition:14
      },
      {
        title:"Barytonsaxofon",
        transposition:21
      },
      {
        title:"Elbas",
        transposition:12
      },
      {
        title:"Gitarr",
        transposition:12
      }
    ]
    
    
    
    const startY=200;
    const dy=50;
    const cols=3
    const startX = cam.width/(cols*2);
    const dx=startX*2
    
    for (const [i,inst] of Object.entries(instruments)) {
      const row=Math.floor(i/cols)
      const col=i%cols;
      const instBtn = this.addLabel(startX+dx*col,startY+dy*row,inst.title,30).setInteractive().on("pointerdown",()=>setTransposition(inst.transposition))
    }
    
    
    
    this.addLabel(cam.centerX,cam.height-50,"Tillbaka",40).setInteractive().on("pointerdown",()=>{
      this.showSettings();
    });
  }
  
  start() {
    try {
    this.scene.start("game",{options:this.options})
    } catch (e) {alert(e)}
  }
}