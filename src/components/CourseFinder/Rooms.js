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
    x:0.2121,
    y:0.1425
  }, {
    x:0.2147,
    y:0.1435
  }, {
    x:0.2147,
    y:0.1435
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

//Bildsalen
Rooms.push({
  title:"Bildsalen",
  x:0.5666,
  y:0.35,
  popupX:0.06,
  popupY:0.17,
  points:[{
    x:0.0184,
    y:0.0144
  }, {
    x:0.1488,
    y:0.092
  }, {
    x:0.1357,
    y:0.214
  }, /* {
    x:0.1385,
    y:0.2155
  }, */ {
    x:0.1355,
    y:0.2346
  },{
    x:0.1336,
    y:0.2333
  },{
    x:0.1315,
      y:0.2521
  },{
    x:0.0013,
    y:0.1745
  },{
    x:0.003,
    y:0.16
  },{
    x:0.002,
    y:0.159
 },{
    x:0.0024,
    y:0.138
 },{
    x:0.0051,
    y:0.140
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

//Orkestersalen
Rooms.push({
  title:"Orkestersalen",
  x:0.7746,
  y:0.4732,
  popupX:0.06,
  popupY:0.17,
  points:[{
    x:0.0188,
    y:0.0150
  }, {
    x:0.148,
    y:0.092
  }, {
    x:0.1363,
    y:0.20
  }, {
    x:0.136,
    y:0.2295
  }, {
    x:0.1389,
    y:0.2312
  },{
    x:0.13495,
    y:0.255
  },{
    x:0.1351,
    y:0.24
  },{
    x:0.1323,
    y:0.2379
  },{
    x:0.1308,
      y:0.2522
  },{
    x:0.0015,
    y:0.1753
  },{
    x:0.0033,
    y:0.1606
  },{ //
    x:0.0064,
    y:0.1305
  }, {
    x:0.0053,
    y:0.1297
  }, {
    x:0.0057,
    y:0.1089
  }, {
    x:0.0085,
    y:0.1105
  }, {
    x:0.0139,
    y:0.0608
  }, {
    x:0.0128,
    y:0.06
 },{
    x:0.0132,
    y:0.0392
 },{
    x:0.016,
    y:0.0406
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

//Konsertsalsgolvet
Rooms.push({
  title:"Ensemblesalen",
  x:0.898,
  y:0.565,
  popupX:0.06,
  popupY:0.17,
  points:[{
    x:0.0273,
    y:0
  }, {
    x:0.0985,
    y:0.0429
  }, {
    x:0.0815,
    y:0.2037
  },{
    x:0.0102,
    y:0.1605
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


export default Rooms