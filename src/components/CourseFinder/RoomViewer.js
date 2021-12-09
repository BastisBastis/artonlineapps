import React, {useState, useRef} from "react"

import sal10Image from "./assets/Sal10.jpg"

const MODE_TITLE =0;
const MODE_COURSES =1;
const MODE_ANIMATION = 2;

const RoomViewer = (props) => {
  const room = props.room;
  
  const videoRef = useRef();
  const [mode, setMode] = useState(0)
  const [courseIndex, setCourseIndex] = useState(-1);
  
  const bgStyle={
    position:"absolute",
    top:'0',
    margin:0,
    height:"100vh",
    width:"100vw",
    backgroundImage:"url("+sal10Image+")",
    backgroundSize: "cover"
  }
  
  const boxStyle = {
    padding:"0.5rem",
    margin:"1rem 2rem",
    background:"rgba(255,255,255,0.9)",
    border:"solid 1px black",
    borderRadius:"0.5rem",
    textAlign:"center",
    
  }
  const titleStyle={
    ...boxStyle,
    fontSize:"1.5rem"
  }
  
  const coursesStyle = {
    ...boxStyle,
    padding:0,
    maxHeight:"100%"
  }
  
  const courseStyle = {
    border:"solid 1px black",
    height:"2rem",
    width:"100%",
    textAlign:"left"
  }
  
  const setCourse=(i)=>{
    setCourseIndex(i);
    setMode(MODE_ANIMATION);
    if (videoRef) {
      videoRef.current.play();
      
    }
  }
  
  return (
    <div style={bgStyle}>
      { mode === MODE_TITLE && (<>
        <div style={titleStyle} >
          {room.title}
        </div>
        <div style={boxStyle} onClick={()=>setMode(MODE_COURSES)}>
          {room.courseDescription}
          <br /><br />Tryck för att komma till kurserna!
        </div> </>)
      }
      {
        mode === MODE_COURSES && (
          <>
          <div style={titleStyle}>
            Välj kurs:
          </div>
          <div style={coursesStyle}>
            {room.courses.map((course, i)=> { 
            return (
              
              <div style={courseStyle} onClick={()=>setCourse(i)}>
                {course.title}
              </div>
              
            )})}
          </div>
          </>
        )
      }
      
      
      <>
        { mode === MODE_ANIMATION && (
          <>
          <div style={boxStyle}>
            {room.courses[courseIndex].description}
            
          </div>
          </>
        )}
          
          <video webkitPlaysInline playsInline width={window.innerWidth}  preload style={{visibility:"visible", backgroundColor:"transparent", display: MODE_ANIMATION === mode? "inline": "none"}} ref={videoRef}>
            { courseIndex>=0 &&
              (<>
                <source 
    src={room.courses[courseIndex].videos[1]} 
    type='video/mp4; codecs="hvc1"' />
  <source 
    src={room.courses[courseIndex].videos[0]} 
    type="video/webm" />
              </>)
            }
          
          </video>
        </>
      
    </div>
  )
}

export default RoomViewer;