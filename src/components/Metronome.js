import React, { useMemo,useState, useEffect }from "react"


//Components
import HomeButton from "./HomeButton"

import Metronome from "../objects/Metronome"

//Objects
//import Metro from "../objects/wa-metro"
//import Metronome from "simple-beats"

const Metro = () => {
  
  
  const [started,setStarted] = useState(false)
  
  const [tempo,setTempo]=useState(120);
  const [timeSig,setTimeSig]=useState(4);
  
  
  const metronome = useMemo(()=>new Metronome(tempo),[]);
  
  //Beat stores the current beat number in the bar
  const [beat,setBeat]=useState("")
  
  
  //useEffect returns the clean up function
  useEffect(()=>{
    return (()=> {
      metronome.stop()
    });  
  },[])
  
  //onBeat gets called on every beat
  const onBeat=(beat)=> {
    setBeat(beat)
  }
  
  const adjustTempo = (val)=>{
    setTempo(val);
    metronome.tempo=val;
  }
  
  const adjustTimeSig = (diff)=>{
    metronome.beats=timeSig+diff;
    setTimeSig(Math.max(1,Number(timeSig)+diff));
    
  }
  
  const toggle=()=>{
    
    metronome.callback=(beat)=>{
      onBeat(beat)
    }
    setBeat("")
    const active = metronome.startStop()
    setStarted(active)
  }
  
  const mainContainerStyle={
    width:"100vw",
    height:"100vh",
    background:"#fff",
    padding:"1rem",
    margin:0,
  }
  
  const tempoStyle={
    fontSize:"1em",
    padding:0,
    margin:0,
    display:"block"
  }
  
  const tempoAdjustStyle={
    display:"inline",
    margin:"0 1em",
    fontSize:"1.5em"
  }
  
  const sliderStyle={
    width:"90%",
    padding:0,
    margin:0,
  }
  
  const beatStyle={
    fontSize:"1em",
    height:"1.5em",
    padding:0,
    margin:0,
  }
  
  const metroContainerStyle={
    maxWidth:"15rem",
    //maxHeight:"3rem",
    fontSize:"2rem",
    margin:"auto",
    border:"solid 2px #000",
    borderRadius:"0.5rem",
    background:"#aaadff",
    textAlign:"center"
  }
  const buttonStyle = {
    //height:"2em",
    width:"4em",
    fontSize:"1em",
    border:"solid 2px black",
    borderRadius:"0.5rem",
    background:"#fff",
    margin:"0.5em auto"
  }
 
  
  return (
    <div style={mainContainerStyle}>

      <div style={metroContainerStyle}>
        <HomeButton/>
        <p style={tempoStyle}>{tempo}</p>
        <div style={tempoAdjustStyle} onClick={()=>adjustTempo(tempo-1)}>-</div>
        <div style={tempoAdjustStyle} onClick={()=>adjustTempo(Number(tempo)+1)}>+</div>
        <input type="range" min="60" max="300" value={tempo} onChange={((e)=>{
          adjustTempo(e.target.value)
          //metronome.tempo=e.target.value
          })} style={sliderStyle} />
          <p style={tempoStyle}>{timeSig}</p>
        <div style={tempoAdjustStyle} onClick={()=>adjustTimeSig(-1)}>-</div>
        <div style={tempoAdjustStyle} onClick={()=>adjustTimeSig(1)}>+</div>
        <p style={beatStyle}>{beat}</p>
        <div style={buttonStyle} onClick={toggle}>{started?"Stoppa":"Starta"}</div>
      </div>
    </div> 
  );
    
  
}

export default Metro;