import React, { useState, useEffect }from "react"


import {  Link} from "react-router-dom";
//Components
 import AppLink from "./AppLink"
import Title from "./HomePage/Title"

//Styles
import styles from "./Home.module.css"

//images
import HomeIcon from "../assets/images/home.png"
import NoteReaderIcon from '../assets/notereaderIcon.png'
import SmartIcon from "../assets/images/smart.png"
import TunerIcon from "../assets/images/tunericon.png"
import PitchyBirdIcon from "../assets/images/pitchy-bird.png"
import VellingeIcon from "../assets/images/VellingeKommun.png"
import ArtistenLogo from "../assets/images/KSLogga.png"
import { MdOutlineDraw as SkissaIcon } from 'react-icons/md'
import { GiMetronome as MetronomeIcon } from 'react-icons/gi'
import CourseFinderIcon from '../assets/images/mapIcon.png'

const Home = () => {
  
  
  
  return (
    
    <nav className={styles.main} >
      <Title />
      <div className={styles.linkContainer}>
        <AppLink to="/notereader" title="Pricka Noten" image={NoteReaderIcon} />
        <AppLink to="/tuner" title="Stämapparat" image={TunerIcon} />
        <AppLink external to="https://www.artistenonline.se" title="S.M.Art" image={SmartIcon} />
        <AppLink to="/pitchy" title="Pitchy Bird" image={PitchyBirdIcon} />
        <AppLink to="/metronome" title="Metronom" image={MetronomeIcon} iconColor={"#000"} />
        <AppLink to="/skissa" title="Skissa" image={SkissaIcon} iconColor={"#000"} />
        <AppLink external noStretch to="https://www.vellinge.se/vellinge-kulturskola-artisten" title="Hemsida" image={VellingeIcon} />
        
        <AppLink external noStretch to="https://svvellinge.speedadmin.dk/registration#/" title="Anmälan" image={ArtistenLogo} />
        <AppLink to="/coursefinder" title="Hitta rätt kurs" image={CourseFinderIcon} />
      </div>
    </nav> 
    
  );
}

export default Home;