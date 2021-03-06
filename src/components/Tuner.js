import React, { useState, useEffect }from "react"


//Components
import HomeButton from "./HomeButton"
 

//Objects
import NoteDetector from "../objects/NoteDetector"

//Styles
import styles from "./Tuner.module.css"



const Tuner = () => {
  
  const [note,setNote] =useState(false);
  const [cents,setCents] = useState(0);
  
  //const [active,setActive] = useState(false);
  
  const [noteDetector,setNoteDetector] =useState(false);
    
  
  const setParameters=(results)=> {
    //console.log(results)
    setNote(results.note);
    setCents(results.cents);
  }
  
  let width=1;
  const padding=5;
  const tunerDiv = document.getElementById("tuner");
  if (tunerDiv) {
    width=tunerDiv.getBoundingClientRect().width-padding*2;
    
  }
  
  
  if (!noteDetector) {
    setNoteDetector(new NoteDetector((res)=>{setParameters(res)},true));
    //startNoteDetector()
  }
  
  
  
  useEffect(()=>{
    console.log("use")
    if (false && noteDetector)
      noteDetector.startDetecting()
    return ()=>noteDetector.active=false
  },[noteDetector])
  
  /*
  
  useEffect(()=>{
    setNoteDetector(new NoteDetector((res)=>{setParameters(res)},true));
  },[])
  */
  
  const indicatorStyle={
    left:(width/100)*cents+"px"
  }
  
  return (
    <div id="tuner" className={styles.tuner}>
      <HomeButton/>
      <div>{note||""}</div>
      <div className={styles.indicator} style={indicatorStyle}></div>
    </div> 
  );
}

export default Tuner;