import TestAnimWebm from "./assets/animations/Rotwebm.webm"
import TestAnimMov from "./assets/animations/Rothevc.mp4"
import ShowdanceGif from "./assets/animations/showdance_gif.gif"
import BalletGif from "./assets/animations/ballet_gif.gif"
import StreetGif from "./assets/animations/street_gif.gif"
import BabyDanceGif from "./assets/animations/baby_gif.gif"

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
      videos:{hevc:TestAnimMov, webm:TestAnimWebm}
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
      videos:{gif:StreetGif}
    },
    {
      title:"Barndans & dansmix",
      description:"Testa att dansa",
      videos:{gif:BabyDanceGif}
    }, 
    {
      title:"Klassisk balett",
      description:"Sa någon Svansjön?",
      videos:{gif:BalletGif}
    },
    {
      title:"Showdans",
      description:"Broadway & sånt",
      videos:{gif:ShowdanceGif}
    }
  ]
})

//Slagverksrummet
Rooms.push({
  title:"Slagverksrummet",
  x:0.0039,
  y:0.5562,
  popupX:0.06,
  popupY:0.17,
  points:[{
    x:0.0092,
    y:0.002
  }, {
    x:0.0533,
    y:0.0282
  }, {
    x:0.0562,
    y:0.001
  },{
    x:0.1193,
    y:0.0386
  },{
    x:0.1138,
    y:0.0886
  },{
    x:0.1168,
    y:0.0905
  },{
    x:0.116,
    y:0.119
  },{
    x:0.1122,
    y:0.153
  },{
    x:0.1123,
    y:0.13
  },{
    x:0.1095,
    y:0.1285
  },{
    x:0.1074,
    y:0.15
  },{
    x:0.00021,
    y:0.0857
  }],
  description:"Här bankas det friskt!",
  courseDescription:"Slagverk kan man välja här.",
  courses:[
    {
      title:"Slagverk",
      description:"Buller och bång",
      videos:{hevc:TestAnimMov, webm:TestAnimWebm, gif:ShowdanceGif}
    }
  ]
})

export default Rooms