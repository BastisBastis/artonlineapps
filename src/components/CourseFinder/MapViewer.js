import React, {useRef, useState, useEffect } from "react"


import Rooms from "./Rooms"
import RoomOverlay from "./RoomOverlay"
import MapPopup from "./MapPopup"

import MapImage from "./assets/ritning.jpg" 


import styles from "./CourseFinder.module.css"

const MapViewer = (props)=> {
  
  const [loaded,setLoaded] =useState(false);
  const [selected,setSelected] =useState(-1)
  
  
  const mapRef = useRef()
  
  const mapClass= selected<0?styles.mapContainer:`${styles.mapContainer} ${styles.mapZoomed}`
  
  const mapZoomedStyle = selected<0?{}:{
    transform: "scale(2)",
    
  }
  
  
  return (
    <>
    
    <div className={styles.mapContainer}>
        <img 
          ref={mapRef} 
          src={MapImage} 
          className={styles.map}
          style={{
            
          }}
          onLoad={() => setLoaded(true)}
          onClick={()=>setSelected(-1)}
        />
        { Rooms.map((room,index)=>{
          //console.log(room)
          return (
            <RoomOverlay 
             mapRef={mapRef.current} 
             room={room}
             selected={selected==index}
             index={index}
             action={((e)=>{
               
               e.stopPropagation()
               setSelected(index)
               
               })}
               
            />
              
          )
        })}
       
      </div>

    {
        selected <0 || (
          < MapPopup 
            room={Rooms[selected]}          
            mapRef={mapRef.current}
            callback={props.roomSetter}
          />
        )
      }
    </>
  )
}

export default MapViewer

/*

return (
    <>
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={100}
      defaultPositionY={100}
    >
    {({ zoomIn, zoomOut, resetTransformation, positionX, positionY, ...rest }) => (
      
      <TransformComponent>
      <div className={styles.mapContainer}>
        <img 
          ref={mapRef} 
          src={MapImage} 
          className={styles.map}
          style={{
            
          }}
          onLoad={() => setLoaded(true)}
          onClick={()=>setSelected(-1)}
        />
        { Rooms.map((room,index)=>{
          //console.log(room)
          return (
            <RoomOverlay 
             mapRef={mapRef.current} 
             room={room}
             selected={selected==index}
             index={index}
             action={((e)=>{
               zoomIn(5);
               e.stopPropagation()
               setSelected(index)})}
            />
              
          )
        })}
      </div>
      </TransformComponent>

      
      )}
    </TransformWrapper>
    {
        selected <0 || (
          < MapPopup 
            room={Rooms[selected]}          
            mapRef={mapRef.current}
          />
        )
      }
    </>
  )


*/