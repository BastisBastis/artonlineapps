/*

att göra:

förhindra dubletter
rapportera olämplig bild
slumpvis ordning
startfärg

*/
import React, { useRef,useState, useEffect }from "react"
import {  useNavigate, Routes, Route } from "react-router-dom";

//Components

import Gallery from "./Gallery"
import Drawer from "./Drawer"
import HomeButton from "../HomeButton"


import styles from "./Skissa.module.css"

const DRAW_MODE=0;
const GALLERY_MODE=1;

const Skissa = ()=> {
  
  const [mode,setMode] = useState(DRAW_MODE);
  const [currentDrawing,setCurrentDrawing] = useState(false)
  
  
  if (mode===DRAW_MODE) {
    return (
      <>
      <Drawer 
      drawingData={currentDrawing}
      galleryLink={((drawingData,index)=>{
        setMode(GALLERY_MODE);
        setCurrentDrawing(drawingData)
      })
      }/>
      <HomeButton />
      </>
    )
  }
  else if (mode===GALLERY_MODE) {
    return (
      <>
      <Gallery 
        
        drawerLink={((drawingData)=>{
        if (drawingData)
          setCurrentDrawing(drawingData)
        setMode(DRAW_MODE);
        })
      }
      />
      <HomeButton />
      </>
    )
  }
}

export default Skissa;