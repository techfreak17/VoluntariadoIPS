const formidable = require('formidable');
const Project = require("../../models/project");
const ConcludedProject = require("../../models/concludedProject");
const User = require("../../models/user");
const fs = require("fs");


addImageToProject = (id, file) => {
  Project.findById(id, function (err, project) {
    project.img.data = fs.readFileSync(file.path);
    project.img.contentType = file.type;
    project.save();
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

    // Parse `req` and upload all associated files
    form.parse(req, function(err, fields, files) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
            
      if(fields.type === "Projeto"){
        addImageToProject(fields.id, files.myFile);
      } else if(fields.type === "Perfil"){
        addImageToUser(fields.id, files.myFile);
      } else if(fields.type === "Anexo"){
        addFileToProject(fields.id, files.myFile)
      }

      //res.json({ filename: firstFileName });
    });
};