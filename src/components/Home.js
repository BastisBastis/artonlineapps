import React, { useState, useEffect }from "react"

import {  Link} from "react-router-dom";
//Components
 import AppLink from "./AppLink"


//Styles
import styles from "./Home.module.css"

//images
import HomeIcon from "../assets/images/home.png"
import NoteReaderIcon from '../assets/notereaderIcon.png'
import SmartIcon from "../assets/images/smart.png"
import TunerIcon from "../assets/images/tunericon.png"
import PitchyBirdIcon from "../assets/images/pitchy-bird.png"

const Home = () => {
  
  
  
  return (
    
    <nav className={styles.main} >
      <h1 className={styles.title}>ARTISTEN ONLINE</h1>
      <div className={styles.linkContainer}>
        <AppLink to="/notereader" title="Pricka Noten" image={NoteReaderIcon} />
        <AppLink to="/tuner" title="Stämapparat" image={TunerIcon} />
        <AppLink to="/smart" title="S.M.Art" image={SmartIcon} />
        <AppLink to="/pitchy" title="Pitchy Bird" image={PitchyBirdIcon} />
      </div>
    </nav> 
    
  );
}

export default Home;