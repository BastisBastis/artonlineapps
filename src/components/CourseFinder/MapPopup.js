import React from "react"

import styles from "./CourseFinder.module.css"


const MapPopup = (props) => {
  
  
  const x=props.room.popupX*props.mapRef.offsetWidth+props.mapRef.offsetLeft;
  const y=props.room.popupY*props.mapRef.offsetHeight+props.mapRef.offsetTop;
  const boxStyle={
    position:"fixed",
    top:"1rem",
    left:"50vw",
    width:"8em",
    padding:"0.5rem",
    background:"#fff",
    border:"solid 1px black",
    borderRadius:"0.5rem",
    whiteSpace: "pre-wrap",
    transform:"translateX(-50%)"
  }
  
  return (
    <div style={boxStyle} onClick={(()=>{
      props.callback(props.room)
      })}>
      {props.room.description}
    </div>
  )
}

export default MapPopup;