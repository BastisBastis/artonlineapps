import React, { useMemo,useState, useEffect }from "react"

import styles from "./Skissa.module.css"  

const iconSize=40;

const ToolButton = ({
  title,
  icon,
  callback=()=>false,
  toggle=false,
  active=false,
  deactivateCallback=()=>false,
  children=[]
  })=> {
    /*
    const [active,setActive]=useState(false)
  
  const action = e=>{
    if (!active || !toggle) {
      callback(e);
      setActive(toggle);
      
    } else {
      deactivateCallback(e);
      setActive(false);
    }
  }
  
  const deactivate=()=>
    setActive=false;
  */
  
  const Icon = icon
  
  const btnClass = active ? `${styles.button} ${styles.activeButton}` : styles.button;
  
  return (
    <div className={btnClass} >
      <div className={styles.buttonLabel} onClick={callback}>
          {title}
          {Icon && <Icon size={iconSize} color={active?"#fff":"#000"}/> }
      </div>
          {active && children.map(child=>child)}
    </div>
  )
}

export default ToolButton