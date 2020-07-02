const formidable = require('formidable');
const Project = require("../../models/project");
const ConcludedProject = require("../../models/concludedProject");
const User = require("../../models/user");
const fs = require("fs");

buildResponse = (myStatus, myObj) =>{
  var auxStatus = 500;
  var auxObj = {error: "something went wrong"};

  if(myStatus){
    auxStatus = myStatus;
  }  

  if(myObj){
    auxObj = myObj;
    if(myStatus===undefined){
      auxStatus = 200;
    }
  }
  
  return JSON.stringify({status: auxStatus,obj: auxObj});
}

addImageToProject = (id, file) => {
  Project.findById(id, function (err, project) {
    if(project){
      project.img.data = fs.readFileSync(file.path);
      project.img.contentType = file.type;
      project.save().then(proj => {return buildResponse(200,proj)});
    } else {
      return buildResponse(404)
    }
    
  });
};

addImageToUser = (id, file) => {
    console.log(file);
};

addFileToProject = (id, file) => {
    console.log(file);
};

module.exports = function upload(req, res) {
    const form = new formidable.IncomingForm();
    var resJSON;

    // Parse `req` and upload all associated files
    form.parse(req, function(err, fields, files) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
            
      if(fields.type === "Project"){
        resJSON = addImageToProject(fields.id, files.myFile);
      } else if(fields.type === "Profile"){
        resJSON = addImageToUser(fields.id, files.myFile);
      } else if(fields.type === "Anex"){
        resJSON = addFileToProject(fields.id, files.myFile)
      }
      if(resJSON){
        console.log(resJSON);
        res.status(resJSON.status).json(resJSON.obj);
      }else {
        res.status(400).json({error: "Appearantly, it died"});
      }
      
    });
};