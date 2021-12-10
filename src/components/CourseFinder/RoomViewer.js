import React, {useState, useRef} from "react"

import sal10Image from "./assets/Sal10.jpg"
import { BsFillArrowLeftCircleFill as BackIcon } from "react-icons/bs";

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
    backgroundSize: "cover",
    fontSize:"18px"
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
    padding: "0.5rem 0",
    fontSize:"1.6rem",
    fontWeight:"800"
  }
  
  const coursesStyle = {
    ...boxStyle,
    padding:0,
    maxHeight:"100%"
  }
  
  const courseStyle = {
    border:"solid 1px black",
    //height:"2rem",
    width:"100%",
    textAlign:"left",
    padding:"0.5em 1em"
    
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
        <BackIcon />
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
          
          <video webkitPlaysInline playsInline width={window.innerWidth}  preload style={{
            visibility:"visible", 
            backgroundColor:"transparent", 
            display: MODE_ANIMATION === mode? "inline": "none"}} ref={videoRef}>
            { courseIndex>=0 &&
              (<>
                {room.courses[courseIndex].videos.hevc && (
                  <source 
                  src={room.courses[courseIndex].videos[1]} 
                  type='video/mp4; codecs="hvc1"' /> )
                }
                {room.courses[courseIndex].videos.webm && (
                  <source 
                  src={room.courses[courseIndex].videos.webm} 
                  type="video/webm" /> )
                }
                {room.courses[courseIndex].videos.gif && (
                  <img src={room.courses[courseIndex].videos.gif} />
                   )
                } 
                </>
                )
              }    
          </video>
        </>
      
    </div>
  )
}

export default RoomViewer;