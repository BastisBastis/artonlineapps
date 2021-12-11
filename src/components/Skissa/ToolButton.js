import React, { useMemo,useState, useEffect }from "react"

import styles from "./Skissa.module.css"  

const iconSize=40;

const ToolButton = ({
  title,
  icon,
  callback=()=>false,
  toggle=false,
  deactivateCallback=()=>false,
  children=[]
  })=> {
    
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
  
  const Icon = icon
  
  const btnClass = active ? `${styles.button} ${styles.activeButton}` : styles.button;
  
  return (
    <div className={btnClass} onClick={action}>
      <div className={styles.buttonLabel} >
          {title}
          {Icon && <Icon size={iconSize} /> }
      </div>
          {active && children.map(child=>child)}
    </div>
  )
}

export default ToolButton