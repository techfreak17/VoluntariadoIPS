const { expect, assert } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server');
const mongoose = require("mongoose");

var projectID;
var userID;

describe('Testar Projetos', function () {
  it('TEST Create Project', function (done) {
    chai.request(server)
      .post('/api/Projects/createProject')
      .send({
        title: "Teste",
        synopsis: "Test",
        intervationArea: "Lorem Ipsum",
        target_audience: "Lorem Ipsum",
        objectives: "Lorem Ipsum",
        description: "Lorem Ipsum",
        date: "2020-08-30T17:15:00.000+00:00",
        interestAreas: "Lorem Ipsum",
        photo: "",
        observations: "Lorem Ipsum",
        relatedEntities: "Lorem Ipsum",
        responsibleID: mongoose.Types.ObjectId("5f0895d0794ff40aac710001"),
        requiredFormation: false,
        formation: "Lorem Ipsum",
        vacancies: 50
      })
      .then(res => {
        projectID = res.body._id;
        try {
          assert.equal(res.body.title, 'Teste');
          assert.equal(res.body.synopsis, 'Test')
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
  it('TEST Read Project', function (done) {
    chai.request(server)
      .get('/api/Projects/editProject/' + projectID)
      .then(res => {
        try {
          assert.equal(res.body.title, 'Teste');
          assert.equal(res.body.synopsis, 'Test')
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
  it('TEST Update Project', function (done) {
    chai.request(server)
      .post('/api/Projects/updateProject/' + projectID)
      .send({
        title: "Teste 2",
        synopsis: "Test update",
        intervationArea: "Lorem Ipsum",
        target_audience: "Lorem Ipsum",
        objectives: "Lorem Ipsum",
        description: "Lorem Ipsum",
        date: "2020-08-30T17:15:00.000+00:00",
        interestAreas: "Lorem Ipsum",
        photo: "",
        observations: "Lorem Ipsum",
        relatedEntities: "Lorem Ipsum",
        responsibleID: mongoose.Types.ObjectId("5f0895d0794ff40aac710001"),
        requiredFormation: false,
        formation: "Lorem Ipsum",
        vacancies: 60
      })
      .then(res => {
        try {
          assert.equal(res.body.title, 'Teste 2');
          assert.equal(res.body.synopsis, 'Test update');
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
  it('TEST Delete Project', function (done) {
    chai.request(server)
      .get('/api/Projects/deleteProject/' + projectID)
      .then(res => {
        try {
          expect(res).to.have.status(202);
          assert.isEmpty(res.body);
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  })
});

describe('Testar Utilizadores', function () {
  it('TEST Create Users', function (done) {
    chai.request(server)
      .post('/api/Admin/createVoluntaryUser')
      .send({
        username: "Test Username",
        name: "Test Name",
        role: "Volunt??rio",
        email: "emailteste@gmail.com",
        password: "Lorem Ipsum",
        password2: "Lorem Ipsum",
        phone: 911111111,
        address: "Lorem Ipsum",
        birthDate: "1998-11-05T00:00:00.000+00:00",
        memberIPS: "Lorem Ipsum",
        schoolIPS: "Lorem Ipsum",
        courseIPS: "Lorem Ipsum",
        interestAreas: "Lorem Ipsum",
        reasons: "Lorem Ipsum",
        observations: "Lorem Ipsum",
        authorization: true,
        listProjects: "Lorem Ipsum"
      })
      .then(res => {
        userID = res.body.userID;
        try {
          assert.equal(res.body.name, 'Test Name');
          assert.equal(res.body.email, 'emailteste@gmail.com');
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
  it('TEST Read Users', function (done) {
    chai.request(server)
      .get('/api/Users/getUser/' + userID)
      .then(res => {
        try {
          assert.equal(res.body.username, 'Test Username');
          assert.equal(res.body.email, 'emailteste@gmail.com');
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
  it('TEST Update Users', function (done) {
    chai.request(server)
      .post('/api/Admin/updateUser/' + userID)
      .send({ 
        username: "Test Username 2",
        name: "Test Name 2",
        role: "Volunt??rio",
        email: "emailteste@gmail.com",
        password: "Lorem Ipsum2",
        password2: "Lorem Ipsum2",
        phone: 911111111,
        address: "Test Address update",
        birthDate: "1998-11-05T00:00:00.000+00:00",
        memberIPS: "Lorem Ipsum",
        schoolIPS: "Lorem Ipsum",
        courseIPS: "Lorem Ipsum",
        interestAreas: ["Lorem Ipsum"],
        reasons: ["Lorem Ipsum"],
        observations: "Lorem Ipsum",
        authorization: true,
        isVerified: true,
        listProjects: []
      })
      .then(res => {
        try {
          assert.equal(res.body[1].name, 'Test Name 2');
          assert.equal(res.body[1].address, 'Test Address update');
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
  it('TEST Delete Users', function (done) {
    chai.request(server)
      .get('/api/Admin/deleteUser/' + userID)
      .then(res => {
        try {
          expect(res).to.have.status(202);
          assert.isEmpty(res.body);
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
});

process.exit(1);