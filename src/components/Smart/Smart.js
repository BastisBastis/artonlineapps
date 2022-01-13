import React from "react"
import SmartPlayer from "./smartplayer/src/components/SmartPlayer"
import videoData from "./assets/Starwars"

const Smart = ()=> {
  
    return (<>
            <SmartPlayer videoData={videoData} />
        </>)
}

export default Smart;