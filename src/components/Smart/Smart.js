import React, {useState} from "react"
import SmartPlayer from "./smartplayer/src/components/SmartPlayer"
import videoData from "./assets/Starwars"

import styles from "./smartplayer/src/components/SmartPlayer.module.css"

const Smart = ()=> {
  const [video,setVideo] = useState(null)
  
  const instructionStyle={
    padding:"0.5rem"
  }
  
  const setResolution = (res)=>{
    setVideo(videoData[res]);
  }
  
  const buttonData=[
    {title:"Stor fil",res:"high"},
    {title:"Liten fil",res:"low"}
  ];
  
  const buttons=buttonData.map(btn=>{
    return (
      <div 
        className={styles.button}
        onClick={()=>setResolution(btn.res)}
        key={"selectVideo"+btn.res}
        style={{
          margin:"1rem",
          textAlign:'center',
          fontSize:"24px"
        }}
      >
        {btn.title}
      </div>
    )
  })
  
  if (video) {
    return (
            <SmartPlayer videoData={video} />
        )
  } else {
   
    return (
      <>
        <div style={instructionStyle}>
          <i>För att starta filmen, klicka på "Ladda liten fil" eller "Ladda stor fil". Om du använder mobildata eller har långsam internetuppkoppling bör välja den lilla filen, annars den stora.</i>
      <h2>Instruktioner:</h2>
      <ul>
        <li>Tryck på instrumentets namn för att ta bort instrumentet.</li>
        <li>Tryck igen för att ta fram instrumentets bild och ljud igen.</li>
        <li>Tryck på själva videon av ett instrument för att ta bort alla andra</li>
      </ul>
        </div>
        {buttons}
      </> 
    )
    
  }
}

export default Smart;