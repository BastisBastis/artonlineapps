import React, { useState } from "react"

import MapViewer from "./MapViewer"
import RoomViewer from "./RoomViewer"
import HomeButton from '../HomeButton'

const CourseFinder = ()=> {
  
  const [room, setRoom] = useState(false)
  
  
  if (room) {
    return (
      <>
      <RoomViewer room={room} gotoMap={()=>setRoom(false)}/>
      
      </>
    )
  } else {
    return (
      <>
        <MapViewer roomSetter={setRoom}
        />    
        <HomeButton />
      </>
      )
  }
  
}

export default CourseFinder;