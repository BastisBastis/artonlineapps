import React, { useState, useEffect }from "react"

import { BrowserRouter as Router, Link, Routes, Route, useParams } from "react-router-dom";


//Components
import MyErrorBoundry from './ErrorBoundry'
import Home from "./Home"
import Tuner from "./Tuner"
import SheetLine from "./SheetLine"
import Smart from "./Smart/Smart"
import PitchyBird from "./PitchyBird"
import Metro from "./Metronome"
import Skissa from "./Skissa/Skissa"
import CourseFinder from "./CourseFinder/CourseFinder"



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
        <Route path="/coursefinder" element={< CourseFinder />} />
    </Routes>
    
    
    </Router>
    </MyErrorBoundry>
  );
  
}

export default PageContainer