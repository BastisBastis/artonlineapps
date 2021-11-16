import Phaser from "phaser"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { IonPhaser } from '@ion-phaser/react'
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';

//images


//Components
import HomeButton from "./HomeButton"

//Game Scenes
import Game from "./NoteReader/scenes/Game"
import GameOver from "./NoteReader/scenes/GameOver"
import Menu from "./NoteReader/scenes/Menu"

//styles
import styles from "./SheetLine.module.css"

//Objects
import NoteDetector from "../objects/NoteDetector"


const game = {
  width:"100%",
  height:"100%",
  type: Phaser.AUTO,
  audio: {
    noAudio: true
  },
  scale: {
    parent:"sl",
      width: 600,
      height: 400,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },   
  scene: [
    Menu,
    Game,
    GameOver
  ],
  plugins: {
        global: [{
            key: 'rexWebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        },
        // ...
        ]
    }
    
}


const SheetLine = () => {
  const [noteDetector,setNoteDetector] =useState(false);
    const [started,setStarted] = useState(false);
  
  const setParameters=(results)=> {
    //console.log(results)
  }
  
  const [searchParams, setSearchParams] = useSearchParams();
  const options={
    clef: searchParams.get("clef"),
    sharps: searchParams.get("sharps"),
    flats: searchParams.get("flats"),
    maxNote: searchParams.get("maxNote"),
    minNote: searchParams.get("minNote"),
    tuning: searchParams.get("tuning"),
    transposition: searchParams.get("transposition"),
  }
  //const clef = searchParams.get("clef");
  
  
  
  const start=()=> {
    if (noteDetector) {
      noteDetector.startDetecting();
    }
    game.callbacks={preBoot:(g)=>
      {
        g.noteDetector=noteDetector;
        if (options && options.sharps) {
          if (options.sharps<0)
            options.sharps=[]
          else {
            
            const sharps=[]
            for (const s of options.sharps) {
              sharps.push(Number(s))
            }
            
            options.sharps=sharps
            
          }
        }
        if (options && options.flats) { 
          if (options.flats<0)
            options.flats=[]
          else {
            const flats=[]
            for (const f of options.flats) {
              flats.push(Number(f))
            }
            options.flats=flats
            console.log(options.flats)
          }
        }
        g.startOptions=options;
      }
        
    }
    setStarted(true);
  }
  
  if (!noteDetector) {
    
    setNoteDetector(new NoteDetector((res)=>{setParameters(res)}));
    //startNoteDetector()
    
  }
  
  useEffect(()=>{
    return ()=>noteDetector.active=false;
  },[noteDetector])
  
  const slStyle={
    width:"100%",
  //height:"15rem"
  }
  
  if (started) {
    return (
      <div style={slStyle} id="sl">
        <HomeButton color="#454545"/>
        <IonPhaser game={game} />
      </div>
    );
  } else {
    return (
      <div style={slStyle} id="sl">
      < HomeButton color="#454545"/>
        <div style={{
          width:"100%",
          height:0,
          paddingTop:"20%",
          paddingBottom:"20%",
          
          height:"3rem",
          backgroundColor:"#bbbbff",
          textAlign:"center",
          color:"#ffffff",
          fontSize:"2rem"
        }} onClick={start}>Starta</div>
    </div>
    )
  }
  
}



export default SheetLine