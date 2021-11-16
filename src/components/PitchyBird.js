import Phaser from "phaser"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { IonPhaser } from '@ion-phaser/react'
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';

//images


//Components
import HomeButton from "./HomeButton"

//Game Scenes
import Game from "./Pitchy/scenes/Game"
import GameOver from "./Pitchy/scenes/GameOver"
//import GameOver from "./NoteReader/scenes/GameOver"
//import Menu from "./NoteReader/scenes/Menu"

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
  physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug:false
		},
		
	},
  scale: {
    parent:"sl",
      width: 600,
      height: 400,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },   
  scene: [
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


const PitchyBird = () => {
  const [noteDetector,setNoteDetector] =useState(false);
    const [started,setStarted] = useState(false);
  
  
  
  const start=()=> {
    if (noteDetector) {
      noteDetector.startDetecting();
    }
    game.callbacks={preBoot:(g)=>
      {
        g.noteDetector=noteDetector;
      }
    }
    setStarted(true);
  }
  
  if (!noteDetector) {
    
    setNoteDetector(new NoteDetector((res)=>false));
    //startNoteDetector()
    
  }
  
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



export default PitchyBird