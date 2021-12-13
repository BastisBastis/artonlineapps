import React, { useRef,useState, useEffect }from "react"
import {  useNavigate, Routes, Route } from "react-router-dom";

//Components
import CanvasDraw from "react-canvas-draw";
import ToolButton from './ToolButton'
import BrushSizePicker from "./BrushSizePicker"
import { HexColorPicker as ColorPicker } from "react-colorful";
import { VscSymbolColor as ColorIcon, VscSave as SaveIcon } from "react-icons/vsc"
import { BsBrush as BrushIcon } from "react-icons/bs"
import { GrGallery as GalleryIcon , GrUndo as UndoIcon} from "react-icons/gr"

import styles from "./Skissa.module.css"

const iconSize=40

const Drawer = (props)=> {
  
  const [brushRadius , setBrushRadius] = useState(4)
  const [brushColor , setBrushColor] = useState("#ababab")
  
  const [canvasRendered,setCanvasRendered]=useState(false);
  
  const canvasRef = useRef();
  
  const [activeButtons,setActiveButtons] = useState({
    color:false,
    brush:false,
    save:false
  })
  
  const toggleButton=(btn)=>{
    setButtonActivity(btn,!activeButtons[btn])
  }
  
  const setButtonActivity=(btn,newVal)=>{
    const tmp={...activeButtons};
    Object.keys(activeButtons).forEach(key=>tmp[key]=key==btn?newVal:false)
    
    setActiveButtons(tmp)
  }
  
  const deactivateButtons=setButtonActivity
  
  const renderOverlay= (()=>{
    for (const val of Object.values(activeButtons)) {
      
      if (val)
        return true;
    }
    return false;
  })()
  
  const navigate = useNavigate();
  
  const buttonHeight=60;
  
  const publish = ()=>{
    deactivateButtons()
    if (canvasRef) {
    fetch('./skissa/save', {
      method: 'POST',
      body: JSON.stringify({
        data:canvasRef.current.getSaveData(),
        image:canvasRef.current.getDataURL("png",false,"#fff")
        }),
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
    deactivateButtons()
    if (canvasRef) {
      
      localStorage.setItem(
        "skissaSave",
        canvasRef.current.getSaveData()
      );
    }
  }
  
  const loadLocal=()=>{
    deactivateButtons()
    if (canvasRef) {
      
      const data= localStorage.getItem("skissaSave");
      console.log(data)
      canvasRef.current.loadSaveData(data)
    }
  }
  
  const openGallery=(index) =>{
    props.galleryLink(canvasRef.current.getSaveData(),index)
  }
  
  useEffect(()=>{
    if (canvasRef && props.drawingData) {
      canvasRef.current.loadSaveData(props.drawingData)
    }
  },[canvasRendered])
  
  useEffect(()=>{
    setCanvasRendered(true)
  },[])
  
  return (
    <div style={{}}>
      <CanvasDraw 
        ref={canvasRef}
        brushRadius={brushRadius}
        brushColor={brushColor}
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight}
        hideGrid={true}
        enablePanAndZoom={true}
        onclick={()=>deactivateButtons()}
      />
      { 
        renderOverlay && (
          <div style={{
            position:"absolute",
            height:"100%",
            width:"100%",
            top:0,
            left:0,
          }} onClick={deactivateButtons} ></div>
        )
        
      }
      <div className={styles.toolbar}>
        < ToolButton 
          icon={ ColorIcon }
          toggle={true}
          active={activeButtons.color}
          callback={()=>toggleButton("color")}
          children={[
            <div className={styles.colorPickerContainer}>
              <ColorPicker color={brushColor} onChange={setBrushColor} />
            </div>
          ]}
        />
        < ToolButton 
          icon={ BrushIcon }
          toggle={true}
          active={activeButtons.brush}
          callback={()=>{
            toggleButton("brush")
            }}
          children={[
            <BrushSizePicker 
              radius={brushRadius} 
              onChange={val=>setBrushRadius(val)}
              />
          ]}
        />
        < ToolButton 
          icon={ UndoIcon }
          callback={(()=>{
            deactivateButtons()
            if (canvasRef) {
              canvasRef.current.undo();
              }
            })
          }
        />
        < ToolButton 
          icon={ SaveIcon }
          toggle={true}
          active={activeButtons.save}
          callback={()=>toggleButton("save")}
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
            icon={ GalleryIcon }
            callback={openGallery}
        />
      </div>
    </div>
  )
}

export default Drawer;