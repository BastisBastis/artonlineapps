import Phaser from "phaser"
import React, { useState, useEffect } from "react"
import { IonPhaser } from '@ion-phaser/react'

//Components


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
  ]
    
}


const SheetLine = () => {
  const [noteDetector,setNoteDetector] =useState(false);
    const [started,setStarted] = useState(false);
  
  const setParameters=(results)=> {
    //console.log(results)
  }
  
  const start=()=> {
    if (noteDetector) {
      noteDetector.resumeContext();
    }
    game.callbacks={preBoot:(g)=>
      {
        console.log(g.scene)
        g.noteDetector=noteDetector;}
    }
    setStarted(true);
  }
  
  if (!noteDetector) {
    
    setNoteDetector(new NoteDetector((res)=>{setParameters(res)}));
    //startNoteDetector()
    
  }
  
  if (started) {
    return (
      
        <IonPhaser game={game} />
        
    );
  } else {
    return (
      <div className={styles.gameContainer}>
        <button onClick={start}>Starta</button>
      </div>
    )
  }
  
}



export default SheetLine