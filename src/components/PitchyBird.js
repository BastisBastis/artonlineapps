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
import Menu from "./Pitchy/scenes/Menu"

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
      width: 1136,
      height: 640,
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
    
    setNoteDetector(new NoteDetector((res)=>false),false,16);
    //startNoteDetector()
    
  }
  
  useEffect(()=>{
    return ()=>noteDetector.active=false;
  },[noteDetector])
  
  const parentStyle={
    display: "grid",
    //resize: both;
    height: "100vh",
    width: "100vw",
    background:"#fff",
    //border: 2px solid #000;
    overflow: "hidden"
  }
  
  const slStyle={
    width: "100%",
    maxHeight: "100%",
    margin: "auto",
    aspectRatio: "3 / 2",
    overflow: "hidden",
    boxSizing: "border-box",
    position: "relative",
    //background: "#a0522d",
    textAlign: "center",
    //font-size: 20px;
    //color: white;
    /* using the below to center the text, optional */
    //display: flex;
    //align-items: center;
    //justify-content: center;
  //height:"15rem"
  }
  
  if (started) {
    return (
      <div style={parentStyle}>
      <div style={slStyle} id="sl">
        <HomeButton color="#454545"/>
        <IonPhaser game={game} />
      </div>
      </div>
    );
  } else {
    return (
      <div style={parentStyle}>
      <div style={slStyle} id="sl">
      < HomeButton color="#454545"/>
        <div style={{
          width:"100%",
          height:0,
          paddingTop:"20%",
          paddingBottom:"20%",
          
          height:"3rem",
          //backgroundColor:"#bbbbff",
          textAlign:"center",
          color:"#454545",
          fontSize:"2rem"
        }} onClick={start}>Starta</div>
    </div>
    </div>
    )
  }
  
}



export default PitchyBird