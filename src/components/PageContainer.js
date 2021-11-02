import React, { useState, useEffect }from "react"


//Components
import Tuner from "./Tuner"
import SheetLine from "./SheetLine"



const PageContainer = () => {
  
  const local=true;
  
  const slStyle={
    width:"100%",
  //height:"15rem"
  }
  return (
    <>
      {/*< Tuner />*/}
      <div style={slStyle} id="sl">
        < SheetLine />
      </div>
    </>
  );
}

export default PageContainer