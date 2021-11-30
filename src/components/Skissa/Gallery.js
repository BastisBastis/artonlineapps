import React, { useRef,useState, useEffect } from "react"


//Components
import CanvasDraw from "react-canvas-draw";
import CanvasDraw from "react-canvas-draw";
import ToolButton from './ToolButton'
import styles from "./Skissa.module.css"

const Gallery = (props)=> {
    
    const {drawingLoaded, setDrawingLoaded} = useState(false);
    const canvasRef = useRef();

    useEffect(()=>{
      setDrawingLoaded(false);
      fetch("./skissa/drawings").then(res=>res.json()).then(data=>{
        console.log(data);
      });
    },[])
  
  return (
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
              <ColorPicker color={brushColor} />
            </div>
          ]}
        />
        < ToolButton 
          title="Pensel"
          toggle={true}
          children={[
            <BrushSizePicker 
              radius={brushRadius} 
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
              <div className={styles.saveMenuButton} >
                Spara
              </div>
              <div className={styles.saveMenuButton} >
                Ladda
              </div>
              <div className={styles.saveMenuButton} >
                Publicera
              </div>
            </div>
          ]}
        />
        < ToolButton 
            title="Galleri"
            
        />
      </div>
    </div>
  )
};

export default Gallery;