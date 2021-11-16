import React, { useState, useEffect }from "react"

import {  Link} from "react-router-dom";

const AppLink = (props)=> {
  
  const containerStyle={
    textDecoration:"none",
    //border: "solid 1px black",
    textAlign:"center",
    width:"5rem",
    padding:0,
    margin:"0.5rem",
    //backgroundColor:"#eeffee"
  }
  const iconStyle={
    width:"4rem",
    height:"4rem",
    margin:0,
    borderRadius:"0.5rem"
    
  }
  const titleStyle = {
    fontSize:"1rem",
    color:"black",
    margin:0
  }
  
  return (
    <Link to={props.to} style={containerStyle}>
      <img src={props.image} style={iconStyle} />
      <p style={titleStyle}>
        {props.title}
      </p>
    </Link>
  )
}

export default AppLink;