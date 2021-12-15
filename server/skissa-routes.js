const fs = require("fs");
const utils=require("./utils")
const sendMail = require("./mail")

exports.setupRoutes=(app)=>{
  
  app.post('/skissa/save',(req, res)=> {
  const data = req.body.data;
  const image=req.body.image;
  
  const imgId=Date.now();
  const link = process.env.EXTERNAL_HOST+ 'skissa/remove?id='+imgId
  const mailOptions={
    to:"sebgus@gmail.com",
    subject:"Ny skiss",
    html: 'En ny bild har publicerats:<br/><a href="'+link+'">Klicka här för att ta bort den</a><br /><img src="'+image+'"/>',
  }
  
  
  
    
  
  const path = __dirname+"/../data/skissaDrawings.json"
  const collection = utils.getJsonFile(path)
  
  let drawingIndex = collection.findIndex(drawing=>drawing.drawing==data);
  if (drawingIndex<0) {
    collection.push({id:imgId,drawing:JSON.parse(data)})
    fs.writeFileSync(path, JSON.stringify(collection))
    drawingIndex=collection.length-1;
    sendMail(mailOptions)
  }
    
  res.json(drawingIndex);
})
  
  app.get('/skissa/remove', (req, res) => {
    
    const path = __dirname+"/../data/skissaDrawings.json"
    const collection = utils.getJsonFile(path).filter(drawing=>drawing.id!=req.query.id)
    
    fs.writeFileSync(path, JSON.stringify(collection))
    
    res.send("Inget gick nog fel")
  });
  
  app.get('/skissa/drawings',(req, res)=> {
    const data = req.query;
    
    returnData={}
    const path = __dirname+"/../data/skissaDrawings.json"
    const collection = utils.getJsonFile(path).map(drawing=>drawing.drawing)
    returnData.totalCount=collection.length;
    if (!isNaN(data.index) && data.index>=0 && data.index<collection.length) {
      returnData.drawing=collection[data.index];
    }
    
    res.json(returnData);
  })
}