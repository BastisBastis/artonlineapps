import React, { useMemo,useState, useEffect }from "react"

import styles from "./Skissa.module.css"  

const ToolButton = ({
  title="Button",
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
      console.log(toggle)
    } else {
      deactivateCallback(e);
      setActive(false);
    }
  }
  
  const btnClass = active ? `${styles.button} ${styles.activeButton}` : styles.button;
  
  return (
    <div className={btnClass} onClick={action}>
          {title}
          {!active || children.map(child=>child)}
    </div>
  )
}

export default ToolButton