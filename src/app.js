import React from 'react';
import ReactDOM from 'react-dom';

//Stylesheet
import "./app.css"

//Components
import PageContainer from "./components/PageContainer"
console.log("hipp")

ReactDOM.render(
  <React.StrictMode>
    <PageContainer />
  </React.StrictMode>, 
  document.getElementById("root")
)