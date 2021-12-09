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
    display: "flex",
    alignItems: "center",
    //justifyContent: "center",
    flexDirection:"column"
    //backgroundColor:"#eeffee"
  }
  
  const iconContStyle={
    width:"4rem",
    height:"4rem",
    margin:0,
    //borderRadius:"0.5rem",
    padding:0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row"
  }
  
  
  const iconStyle={
    borderRadius:"0.5rem",
    overflow:"hidden"
  }
  if (props.noStretch) {
    iconStyle.objectFit="cover"
    iconStyle.maxWidth="100%"
    iconStyle.maxHeight="100%"
    iconStyle.margin="auto",
    iconStyle.borderRadius=0
  } else {
    iconStyle.width="100%"
    iconStyle.height="100%"
    iconStyle.margin="0"
  }
  
  const titleStyle = {
    fontSize:"1rem",
    color:"black",
    margin:0
  }
  
  
  let image;
  if (typeof(props.image) == "string") {
    image= <img src={props.image} style={iconStyle} />
  } else {
    const Icon =props.image;
    image = <Icon style={iconStyle} color={props.iconColor} />
    /*
    image = (<span style={{
      width:"4em"
    }}>{props.image} </span> )
    */
    
  }
  
  
  
  const contents= (
    <>
      <div style={iconContStyle}>
        {image}
      </div>
        <p style={titleStyle}>
          {props.title}
        </p>
      
     </> 
  )
  
  if (props.external) {
    return (
      <a href={props.to} style={containerStyle}>
        {contents} 
      </a>
    )
  } else {
    return (
      <Link to={props.to} style={containerStyle}>
        {contents}
      </Link>
    )
  }
  
}

export default AppLink;