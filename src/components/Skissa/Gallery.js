import React, { useRef,useState, useEffect } from "react"


//Components
import CanvasDraw from "react-canvas-draw";
import ToolButton from './ToolButton'

import { GrCaretNext as PlayIcon, GrHome as HomeIcon} from "react-icons/gr"
import { BsBrush as UseIcon } from "react-icons/bs"
import { HiOutlineChevronDoubleLeft as PrevIcon, HiOutlineChevronDoubleRight as NextIcon } from "react-icons/hi"

import styles from "./Skissa.module.css"


const buttonHeight=60;
const slowLoadingTime=5;

const Gallery = (props)=> {
    
    const [drawingLoaded, setDrawingLoaded] = useState(false);
    const [drawingIndexes,setDrawingIndexes] = useState([]);
    const [currentIndex,setCurrentIndex]=useState(props.index || 0);
    const [currentData, setCurrentData] = useState(1);
    const [shouldPlay,setShouldPlay]=useState(false)
    
    
    const canvasRef = useRef();

    const fetchDrawing=(index)=>{
      setDrawingLoaded(false);
      fetch("./skissa/drawings?index="+drawingIndexes[index]).then(res=>res.json()).then(data=>{
        setCurrentIndex(index)
        setCurrentData(JSON.stringify(data.drawing))
        setDrawingLoaded(true);
        try {
        canvasRef.current.loadSaveData(JSON.stringify(data.drawing))
        } catch (e) {alert(e)}
        });
    }
    
 
    
    useEffect(()=>{
      setDrawingLoaded(false);
      fetch("./skissa/drawings").then(res=>res.json()).then(data=>{
        const tmpIndexes=[];
        for (let i=0;i<data.totalCount;i++) {
          tmpIndexes.push(i);
        }
        setDrawingIndexes(tmpIndexes);
        
      });
    },[])
    
    useEffect(()=> {
      if (drawingIndexes.length>0)
      fetchDrawing(0)
    },[drawingIndexes])
    
    useEffect(()=>{
      if (shouldPlay) {
        canvasRef.current.loadSaveData(currentData);
      }
    },[shouldPlay])
    
    const nextDrawing=() => {
      const i = (currentIndex+1) % drawingIndexes.length;
      setShouldPlay(false);
      fetchDrawing(i);
    }
    
    const prevDrawing=()=>{
      const i = (currentIndex+drawingIndexes.length-1) % drawingIndexes.length
      fetchDrawing(i);
    }
    
  
  return (
    <div style={{}}>
      <CanvasDraw 
        ref={canvasRef}
        loadTimeOffset={shouldPlay?10:1}
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight-buttonHeight}
        hideGrid={true}
        disabled={true}
        hideInterface={true}
        enablePanAndZoom={true}
      />
      <div className={styles.toolbar}>
        < ToolButton 
          icon={PrevIcon}
          callback={prevDrawing}
        />
        < ToolButton 
          icon={NextIcon}
          callback={nextDrawing}
        />
        < ToolButton 
          icon={PlayIcon}
          callback={(()=>setShouldPlay(true))}
        />
        < ToolButton 
          icon={UseIcon}
          callback={()=>props.drawerLink(currentData)}
        />
        < ToolButton 
            icon={HomeIcon}
            callback={()=>props.drawerLink()}
        />
      </div>
    </div>
  )
};

export default Gallery;