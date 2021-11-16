import React, { useState, useEffect }from "react"

import {  Link} from "react-router-dom";

//Images
import HomeIcon from '../assets/images/home.png'



const HomeButton = (props)=> {
  
  const containerStyle={
    width:"2rem",
    height:"2rem",
    position:"absolute",
    top:'1rem',
    left:"1rem",
    background:props.color||"black",
    WebkitMask:"url("+HomeIcon+") center/contain",
    mask:"url("+HomeIcon+") center/contain"
  }
  return (
    <Link style={containerStyle} to="/"></Link> 
  )
}

export default HomeButton;