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
  
  //Generate pseudo unique id for the drawing
  const imgId=Date.now() + "-" + Math.floor(Math.random()*10000); 

  //Link to remove the drawing
  const link = process.env.EXTERNAL_HOST+ 'skissa/remove?id='+imgId
  const mailOptions={
    to:"sebgus@gmail.com",
    subject:"Ny skiss",
    html: 'En ny bild har publicerats:<br/><a href="'+link+'">Klicka här för att ta bort den</a><br /><img src="'+image+'"/>',
  }
  
  //Saved drawings data
  const collection = utils.getJsonFile(path)
  
  //If the drawing doesn't exist in the file, add it, save it and send an e-mail to the administrator
  let drawingIndex = collection.findIndex(drawing=>drawing.drawing==data);
  if (drawingIndex<0) {
    collection.push({id:imgId,drawing:JSON.parse(data)})
    fs.writeFileSync(path, JSON.stringify(collection))
    drawingIndex=collection.length-1;
    sendMail(mailOptions)
  }
    
  //Send index of the drawing
  res.json(drawingIndex);
})
  
//Remove the drawing supplied in the query
  app.get('/skissa/remove', (req, res) => {

    try {
    const collection = utils.getJsonFile(path).filter(drawing=>drawing.id!=req.query.id)
    fs.writeFileSync(path, JSON.stringify(collection))
    res.send("Inget gick nog fel")
    } catch (error) {
      console.error(error)
      res.send(error);
    }
  });
  
  //Request to get a single drawing and/or the count of drawings
  //The json sent has the following properties:
  //returnData.totalCount = count of drawings
  //returnData.drawing = react-canvas-draw data for the drawing with the queried index.
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
