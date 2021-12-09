import React from "react"


const RoomOverlay = (props) => {
  
  if (!props.mapRef)
    return null;
    
  const room = props.room
  
  const mapWidth=props.mapRef.offsetWidth;
  const mapHeight=props.mapRef.offsetHeight;
  const mapX=props.mapRef.offsetLeft;
  const mapY=props.mapRef.offsetTop;
  
  const style={
    position:"absolute",
    top: (room.y  *mapHeight+mapY)+"px",
    left: (room.x  *mapWidth+mapX)+"px",
    opacity:props.selected?0.2:0
  }
  
  let roomWidth=0;
  let roomHeight=0;
  
  let path = "";
  room.points.forEach((p,i)=> {
    roomWidth=Math.max(roomWidth,p.x);
    roomHeight=Math.max(roomHeight,p.y)
    path+= i>0?"L ":"M ";
    path+= `${p.x *mapWidth+mapX} ${p.y *mapHeight+mapY} `;
  });
  path+="Z";
  roomHeight*=mapHeight;
  roomWidth*=mapWidth;
  
  
  return (
    <>
      <svg 
        style={style}
        width={roomWidth} height={roomHeight}>
  
    <path d={path}
          fill="#0f0"
          onClick={(e)=>props.action(e)} 
          />
     </svg>

    </>
  )
}

/*
"M  140   0
             L 1220   229
             L 1080   698
             L    0   469
             Z"
*/

export default RoomOverlay;