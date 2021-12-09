import React, { useState } from "react"

import MapViewer from "./MapViewer"
import RoomViewer from "./RoomViewer"

const CourseFinder = ()=> {
  
  const [room, setRoom] = useState(false)
  
  
  if (room) {
    return (
      <RoomViewer room={room} />
    )
  } else {
    return (
        <MapViewer roomSetter={setRoom}
        />    
      )
  }
  
}

export default CourseFinder;