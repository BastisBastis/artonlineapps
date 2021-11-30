const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const fs = require("fs");

// Setup
const app = express();
const port = process.env['REACT_APP_PORT'];
const config = require('./webpack.config.js');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    // Due to iOS devices memory constraints
    // disabling file watching is recommended 
    //ignored: /.*/
  }
});
app.use(middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getJsonFile=path=>{
  let rawdata = fs.readFileSync(path);
  let json = JSON.parse(rawdata);
  //console.log(json);
  return json;
}

app.post('/skissa/save',(req, res)=> {
  const data = req.body.data;
  
  const path = __dirname+"/data/skissaDrawings.json"
  const collection = getJsonFile(path)
  collection.push(JSON.parse(data))
  fs.writeFileSync(path, JSON.stringify(collection))
  res.json(collection.length-1);
})

app.post('/skissa/drawings',(req, res)=> {
  const data = req.body.data;
  
  returnData={}
  const path = __dirname+"/data/skissaDrawings.json"
  const collection = getJsonFile(path)
  returnData.totalCount=collection.length;
  if (!isNaN(data.index) && data.index>=0 && data.index<collection.length) {
    returnData.drawing=collection[data.index];
  }
  
  res.json(returnData);
})

app.post('/pitchy/highscore',(req, res)=> {
  const score = req.body.score;
  const name = req.body.name;
  const path = __dirname+"/data/pitchyHighscore.json"
  const hs = getJsonFile(path)
  let i=0;
  let playerIndex = -1;
  let done=false
  let newHs=[]
  while (i<5) {
    if (!done && score>hs[i].score) {
      newHs.push({name:name,score:score})
      done=true
      playerIndex=i
    }
    newHs.push(hs[i])
    i++;
  }
  newHs=newHs.filter((sc,index)=>index<5);
    
  const h = fs.writeFileSync(path, JSON.stringify(newHs))
  if (playerIndex>=0)
    newHs[playerIndex].player=true

  
  res.json(newHs);
})

app.get('/pitchy/highscore',(req, res)=> {
  const score = req.query.score;
  const hs = getJsonFile(__dirname+"/data/pitchyHighscore.json")
  let newHighscore=false;
  hs.forEach(sc=>{
    if (score>sc.score) 
      newHighscore=true;
  })
  const data = {
    newHighscore:newHighscore,
    highscore: hs
  }
  
  res.json(data);
})

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Launch app
app.listen(port, () => {
  console.log(
    'Launching app... http://localhost:' + port + '\n'
  );
});

// Register app and middleware. Required for better
// performance when running from play.js
try { pjs.register(app, middleware); } catch (error) { }
