const fs = require("fs")
const utils=require("./utils")

exports.setupRoutes=app=>{

app.post('/pitchy/highscore',(req, res)=> {
  const score = req.body.score;
  const name = req.body.name;
  const path = __dirname+"/../data/pitchyHighscore.json"
  const hs = utils.getJsonFile(path)
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
  const hs = utils.getJsonFile(__dirname+"/../data/pitchyHighscore.json")
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

}