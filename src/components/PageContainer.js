import React, { useState, useEffect }from "react"

import { BrowserRouter as Router, Link, Routes, Route, useParams } from "react-router-dom";


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
    <Router>
    <Routes>
      
        <Route path="/tuner" element={ < Tuner /> } />
        <Route path="/" element={< SheetLine />} />
      
    </Routes>
    <div>
      <h1>Verktyg och spel</h1>
      <nav>
        <ul>
          <li>
            <Link to="/tuner">Tuner</Link>
          </li>
          <li>
            <Link to="/">Pricka Noten</Link>
          </li>
        </ul>
      </nav>
    </div>
    </Router>
  );
  
}

export default PageContainer