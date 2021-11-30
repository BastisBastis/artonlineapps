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

import Gallery from "./Gallery"
import Drawer from "./Drawer"

import styles from "./Skissa.module.css"

const DRAW_MODE=0;
const GALLERY_MODE=1;

const Skissa = ()=> {
  
  const [mode,setMode] = useState(DRAW_MODE);
  
  
  
  if (mode===DRAW_MODE) {
    return (
      <Drawer galleryLink={(index=>setMode(GALLERY_MODE))}/>
    )
  }
  else if (mode===GALLERY_MODE) {
    return (
      <Gallery />
    )
  }
}

export default Skissa;