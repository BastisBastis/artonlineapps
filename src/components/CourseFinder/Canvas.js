import React, {useRef, useEffect} from "react"

const Canvas = (props) =>{
  const canvasRef = useRef()
  
  useEffect(()=> {
    if (canvasRef.current && props.videoRef.current) {
      const interval = setInterval(()=>{
        const ctx=canvasRef.current.getContext("2d");
        const img=ctx.getImageData(0,0,250,188);
        const pixels=img.data;
        
        for (let i=0;i<pixels.length;i+=4) {
          if (pixels[i]===0 && pixels[i+1]===0 && pixels[i+2]===0) {
            pixels[i+3]=0;
          }
        }
        
        //ctx.drawImage(props.videoRef.current,0,0,250,188);
        ctx.putImageData(img);
      },100);
      return ()=>clearInterval(interval)
    }
  },[])
  
  return (
    <canvas ref={canvasRef} width={250} height={188} />
  )
}

export default Canvas;