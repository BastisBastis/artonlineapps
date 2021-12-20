const fs = require("fs");
const utils=require("./utils")
const sendMail = require("./mail")

//Path to saved data
const path = __dirname+"/../data/skissaDrawings.json"

exports.setupRoutes=(app)=>{
  
  app.post('/skissa/save',(req, res)=> {
    //Save the drawing data to file and send an e-mail to administrator. Returns the index of the drawing in the collection
  const data = req.body.data; //React-canvas-draw data of the drawing
  const image=req.body.image; //The image in PNG format
  
  
  const imgId=Date.now() + "-" + Math.floor(Math.random()*10000); //Pseudo unique id for the drawing
  const link = process.env.EXTERNAL_HOST+ 'skissa/remove?id='+imgId
  const mailOptions={
    to:"sebgus@gmail.com",
    subject:"Ny skiss",
    html: 'En ny bild har publicerats:<br/><a href="'+link+'">Klicka här för att ta bort den</a><br /><img src="'+image+'"/>',
  }
  
  //Saved drawings data
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

    const collection = utils.getJsonFile(path).filter(drawing=>drawing.id!=req.query.id)
    
    fs.writeFileSync(path, JSON.stringify(collection))
    
    res.send("Inget gick nog fel")
  });
  
  app.get('/skissa/drawings',(req, res)=> {
    const data = req.query;
    
    returnData={}
    const collection = utils.getJsonFile(path).map(drawing=>drawing.drawing)
    returnData.totalCount=collection.length;
    if (!isNaN(data.index) && data.index>=0 && data.index<collection.length) {
      returnData.drawing=collection[data.index];
    }
    
    res.json(returnData);
  })
}
