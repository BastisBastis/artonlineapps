import React, { useState, useEffect }from "react"

import { BrowserRouter as Router, Link, Routes, Route, useParams } from "react-router-dom";


//Components
import MyErrorBoundry from './ErrorBoundry'
import Home from "./Home"
import Tuner from "./Tuner"
import SheetLine from "./SheetLine"
import Smart from "./Smart"
import PitchyBird from "./PitchyBird"
import Metro from "./Metronome"
import Skissa from "./Skissa/Skissa"



const PageContainer = () => {
  
  
  
  return (
    <MyErrorBoundry>
    <Router>
    <Routes>
        <Route path="/" element={ < Home /> } />
        <Route path="/tuner" element={ < Tuner /> } />
        <Route path="/notereader" element={< SheetLine />} />
        <Route path="/smart" element={< Smart />} />
        <Route path="/pitchy" element={< PitchyBird />} />
        <Route path="/metronome" element={< Metro />} />
        <Route path="/skissa" element={< Skissa />} />
    </Routes>
    
    
    </Router>
    </MyErrorBoundry>
  );
  
}

export default PageContainer