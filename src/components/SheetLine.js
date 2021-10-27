import Phaser from "phaser"
import React, { useState, useEffect } from "react"
import { IonPhaser } from '@ion-phaser/react'

//Components


//Game Scenes
import Game from "./NoteReader/scenes/Game"

//styles
import styles from "./SheetLine.module.css"

const game = {
  width:"100%",
  height:"100%",
  type: Phaser.AUTO,
  audio: {
    noAudio: true
  },
  scale: {
      width: 600,
      height: 400,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },   
    
  scene: [
    Game
  ]
    
}



const SheetLine = () => {
  
  
  return (
    <div className={styles.gameContainer}>
      <IonPhaser game={game} />
    </div>
  );
}

export default SheetLine