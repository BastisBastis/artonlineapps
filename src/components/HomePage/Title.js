import React from "react"

import styles from "../Home.module.css"

import logo from "../../assets/images/KSLogga.png"

const animateTag=false;

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
    
    const tagClass = styles.tag + (animateTag ? " "+styles.blinking:"")
    

  return (
    <div style={imgContStyle}>
      <img src={logo} style={imgStyle} />
      <p className={tagClass}>online</p>
    </div>
  )
}

export default Title;