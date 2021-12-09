import TestAnimWebm from "./assets/animations/Test8.webm"
import TestAnimMov from "./assets/animations/Test7.mov"

const Rooms=[];



//Konsertsalsgolvet
Rooms.push({
  title:"Konserthusgolvet",
  x:0.032,
  y:0.15,
  popupX:0.06,
  popupY:0.17,
  points:[{
    x:0.025,
    y:0
  }, {
    x:0.215,
    y:0.112
  }, {
    x:0.19,
    y:0.3425
  },{
    x:0,
    y:0.23
  }],
  description:"Här sitter publiken och gottar sig!",
  courseDescription:"Egentligen inga kurser här.",
  courses:[
    {
      title:"Magdans",
      description:"Rulla med magen å sånt",
      videos:[TestAnimWebm,TestAnimMov]
    }
  ]
})

//Danssalen
Rooms.push({
  title:"Danssalen",
  x:0.39,
  y:0.25,
  popupX:0.36,
  popupY:0.02,
  points:[{
    x:0.018,
    y:0.008
  }, {
    x:0.1096,
    y:0.063
  }, {
    x:0.0928,
    y:0.2212
  }, {
    x:0.0096,
    y:0.172
  },{
    x:0.009,
    y:0.178
  },{
    x:0.0087,
    y:0.2069
  },{
    x:0.0005,
    y:0.2025
  },{
    x:0,
    y:0.18
  }],
  description:"Här kan du lära dig SHOWDANS, HIPHOP/STREET och BALETT!\n\nTryck här för att se danserna!",
  courseDescription:"Vi har en massa dansstilar och undervisning i olika åldrar från 5-åringar till 19-åringar.",
  courses:[
    {
      title:"Hiphop/Street",
      description:"Swag å popping å locking å rocking å rolling?",
      videos:[TestAnimWebm,TestAnimMov]
    },
    {
      title:"Barndans & dansmix",
      description:"Testa att dansa",
      videos:[TestAnimWebm,TestAnimMov]
    }, 
    {
      title:"Klassisk balett",
      description:"Sa någon Svansjön?",
      videos:[TestAnimWebm,TestAnimMov]
    },
    {
      title:"Showdans",
      description:"Broadway & sånt",
      videos:[TestAnimWebm,TestAnimMov]
    }
  ]
})

export default Rooms