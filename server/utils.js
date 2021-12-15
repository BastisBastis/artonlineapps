const fs = require("fs");

exports.getJsonFile=path=>{
  let rawdata = fs.readFileSync(path);
  let json = JSON.parse(rawdata);
  return json;
}