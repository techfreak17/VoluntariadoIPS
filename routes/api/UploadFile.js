const formidable = require('formidable');
const Project = require("../../models/project");
const SubmitedProject = require("../../models/submitedProject");
const User = require("../../models/user");
const Voluntary = require("../../models/voluntary");
const fs = require("fs");

buildResponse = (myStatus, myObj) => {
  var auxStatus = 500;
  var auxObj = { error: "something went wrong" };

  if (myStatus) {
    auxStatus = myStatus;
  }

  if (myObj) {
    auxObj = myObj;
    if (myStatus === undefined) {
      auxStatus = 200;
    }
  }

  return JSON.stringify({ status: auxStatus, obj: auxObj });
}

addImageToProject = (id, file) => {
  Project.findById(id, function (err, project) {
    if (project) {
      project.img.data = fs.readFileSync(file.path);
      project.img.contentType = file.type;
      project.save();
      return buildResponse(200, project);
    } else {
      return buildResponse(404)
    }
  });
};

addImageToSubmitedProject = (id, file) => {
  SubmitedProject.findById(id, function (err, submitedProject) {
    if (submitedProject) {
      submitedProject.img.data = fs.readFileSync(file.path);
      submitedProject.img.contentType = file.type;
      submitedProject.save();
      return buildResponse(200, submitedProject);
    } else {
      return buildResponse(404)
    }
  });
};

addImageToUser = (id, file) => {
  User.findById(id, function (err, user) {
    if (user) {
      user.img.data = fs.readFileSync(file.path);
      user.img.contentType = file.type;
      user.save().then(us => { return buildResponse(200, us) });
    } else {
      return buildResponse(404)
    }
  });
};

addFileToProject = (id, file) => {
  Project.findById(id, function (err, project) {
    if (project) {
      project.file.data = fs.readFileSync(file.path);
      project.file.contentType = file.type;
      project.save().then(proj => { return buildResponse(200, proj) });
    } else {
      return buildResponse(404)
    }
  });
};

module.exports = function upload(req, res) {
  const form = new formidable.IncomingForm();
  var resJSON;

  // Parse `req` and upload all associated files
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (fields.type === "Projeto") {
      resJSON = addImageToProject(fields.id, files.myFile);
    } else if (fields.type === "Utilizador") {
      resJSON = addImageToUser(fields.id, files.myFile);
    } else if (fields.type === "Anex") {
      resJSON = addFileToProject(fields.id, files.myFile)
    } else if (fields.type === "Submissao Projeto") {
      resJSON = addImageToSubmitedProject(fields.id, files.myFile)
    }
    if (resJSON) {
      res.status(resJSON.status).json(resJSON.obj);
    } else {
      res.status(400).json({ error: "Appearantly, it died" });
    }

  });
};