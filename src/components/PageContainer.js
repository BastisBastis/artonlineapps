import React, { useState, useEffect }from "react"

import { BrowserRouter as Router, Link, Routes, Route, useParams } from "react-router-dom";


//Components
import Home from "./Home"
import Tuner from "./Tuner"
import SheetLine from "./SheetLine"
import Smart from "./Smart"
import PitchyBird from "./PitchyBird"


const PageContainer = () => {
  
  
  
  return (
    <Router>
    <Routes>
        <Route path="/" element={ < Home /> } />
        <Route path="/tuner" element={ < Tuner /> } />
        <Route path="/notereader" element={< SheetLine />} />
        <Route path="/smart" element={< Smart />} />
        <Route path="/pitchy" element={< PitchyBird />} />
    </Routes>
    
    
    </Router>
  );
  
}

export default PageContainer