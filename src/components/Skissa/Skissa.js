/*

Öppna appen: Canvas och förladdad pensel

Verktygsfält:

Ritverktyg
  Färg
  Pensel
Generera länk
Publicera
Galleri

Galleri:
nästa (dlumpvis ordnibg)
föregående
Fortsätt på


*/
import React, { useRef,useState, useEffect }from "react"
import {  useNavigate, Routes, Route } from "react-router-dom";

//Components
import CanvasDraw from "react-canvas-draw";
import ToolButton from './ToolButton'
import BrushSizePicker from "./BrushSizePicker"
import { HexColorPicker as ColorPicker } from "react-colorful";
import Gallery from "./Gallery"

import styles from "./Skissa.module.css"

const Skissa = ()=> {
  
  const [brushRadius , setBrushRadius] = useState(4)
  const [brushColor , setBrushColor] = useState("#ababab")
  
  const canvasRef = useRef();
  
  const navigate = useNavigate();
  
  const buttonHeight=60;
  
  const publish = ()=>{
    if (canvasRef) {
    fetch('./skissa/save', {
      method: 'POST',
      body: JSON.stringify({data:canvasRef.current.getSaveData()}),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
      })
      .then(response => {
        console.log("hupp")
        return response.json()
        })
      .then(json => {
          console.log(json)
          //this.showHighscore(json)
      }).catch(error=>{
        console.log(error)
        alert(error)
      });
    
    } else {
      alert("Kan ej hitta referensen tili CANVAS")
    }
    
  }
  
  const saveLocal=()=>{
    if (canvasRef) {
      console.log(canvasRef.current.getSaveData())
      localStorage.setItem(
        "skissaSave",
        canvasRef.current.getSaveData()
      );
    }
  }
  
  const loadLocal=()=>{
    if (canvasRef) {
      
      const data= localStorage.getItem("skissaSave");
      canvasRef.current.loadSaveData(data)
    }
  }
  
  const openGallery=(index) =>{
    navigate("/skissa/gallery");
  }
  
  return (
    <Routes>
    <Route path="/" element={
    <div style={{}}>
      <CanvasDraw 
        ref={canvasRef}
        brushRadius={brushRadius}
        brushColor={brushColor}
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight-buttonHeight}
        hideGrid={true}
        enablePanAndZoom={true}
      />
      <div className={styles.toolbar}>
        < ToolButton 
          title="Färg"
          toggle={true}
          children={[
            <div className={styles.colorPickerContainer}>
              <ColorPicker color={brushColor} onChange={setBrushColor} />
            </div>
          ]}
        />
        < ToolButton 
          title="Pensel"
          toggle={true}
          children={[
            <BrushSizePicker 
              radius={brushRadius} 
              onChange={val=>setBrushRadius(val)}
              />
          ]}
        />
        < ToolButton 
          title="Undo"
          
        />
        < ToolButton 
          title="Spara"
          toggle={true}
          children={[
            <div className={styles.unCollapsed}>
              <div className={styles.saveMenuButton} onClick={saveLocal}>
                Spara
              </div>
              <div className={styles.saveMenuButton} onClick={loadLocal}>
                Ladda
              </div>
              <div className={styles.saveMenuButton} onClick={publish}>
                Publicera
              </div>
            </div>
          ]}
        />
        < ToolButton 
            title="Galleri"
            callback={openGallery}
        />
      </div>
    </div>
    } />
    <Route path="/gallery" element={ "Blibluvv" } />
    
    
    
    </Routes>
  )
}

export default Skissa;