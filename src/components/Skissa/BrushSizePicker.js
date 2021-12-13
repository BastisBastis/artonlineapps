import React, {useState} from "react"

import styles from "./Skissa.module.css"

const BrushSizePicker = props=>{
  
  const maxRadius=30;
  const minRadius=1;
  
  return (
    <div className={styles.unCollapsed} style={{
      width:"68px",
      border:"solid 1px black",
      borderRadius:"0.5rem",
      background:"white",
      fontSize:"1.2rem",
      
    }} onClick={
      e=>{
        e.stopPropagation()}
    }>
      Storlek:
      <p>{props.radius}</p>
      <p onClick={()=>props.onChange(Math.min(props.radius+1,maxRadius))}>+</p>
      <div style={{padding:'auto',padding:maxRadius-props.radius+"px 0"}}>
         <div style={{
          margin:"0 auto",
          width:props.radius*2+"px",
          height:props.radius*2+"px",
          background:"black",
          borderRadius:props.radius+"px"
        }}></div>
      </div>
      <p onClick={()=>props.onChange(Math.max(props.radius-1,minRadius))}>-</p>
    </div>
  )
}

export default BrushSizePicker