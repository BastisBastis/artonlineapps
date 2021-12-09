import React from "react"

import styles from "../Home.module.css"

import logo from "../../assets/images/KSLogga.png"

const Title = ()=> {


    const imgContStyle= {
      height:"4em",
      overflow:"hidden"
    }
    const imgStyle={
      position:"relative",
      top:"-2.7em",
      left:0,
      width:"10em"
    }
    
    const tagStyle={
      position:"relative",
      top:"-4.8em",
      left:"1.2em",
      fontSize:"1.5em",
      fontWeight:600
    }

  return (
    <div style={imgContStyle}>
      <img src={logo} style={imgStyle} />
      <p style={tagStyle} className={styles.blink}>online</p>
    </div>
  )
}

export default Title;