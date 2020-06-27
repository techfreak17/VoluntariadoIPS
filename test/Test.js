const { expect, assert } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../server');
var projectID;
var userID;

describe('Testar Projetos', function () {
  it('TEST Create Project', function (done) {
    chai.request(server)
      .post('/api/Projects/createProject')
      .type('form')
      .send({
        title: "Teste",
        synopsis: "Lorem Ipsum",
        intervationArea: "Lorem Ipsum",
        target_audience: "Lorem Ipsum",
        objectives: "Lorem Ipsum",
        description: "Lorem Ipsum",
        date: "2020-08-30T17:15:00.000+00:00",
        interestAreas: "Lorem Ipsum",
        photo: "",
        observations: "Lorem Ipsum",
        relatedEntities: "Lorem Ipsum",
        responsibleID: "Abílio Lários",
        requiredFormation: false,
        formation: "Lorem Ipsum"
      })
      .then(res => {
        projectID = res.body._id;
        try {
          assert.equal(res.body.title, 'Teste');
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
      .type('form')
      .send({
        title: "Teste 2",
        synopsis: "Lorem Ipsum",
        intervationArea: "Lorem Ipsum",
        target_audience: "Lorem Ipsum",
        objectives: "Lorem Ipsum",
        description: "Lorem Ipsum",
        date: "2020-08-30T17:15:00.000+00:00",
        interestAreas: "Lorem Ipsum",
        photo: "",
        observations: "Lorem Ipsum",
        relatedEntities: "Lorem Ipsum",
        responsibleID: "Abílio Lários",
        requiredFormation: false,
        formation: "Lorem Ipsum"
      })
      .then(res => {
        try {
          assert.equal(res.body.title, 'Teste 2');
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
      .type('form')
      .send({
        username: "Username",
        name: "Name",
        role: "Voluntário",
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
          assert.equal(res.body.name, 'Name');
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
      .post('/api/Users/updateUser/' + userID)
      .type('form')
      .send({
        username: "Username",
        name: "Name 2",
        role: "Voluntário",
        email: "emailteste@gmail.com",
        password: "Lorem Ipsum2",
        password2: "Lorem Ipsum2",
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
        try {
          assert.equal(res.body.name, 'Name 2');
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
        }
        catch (e) {
          return done(e);
        }
        done();
      });
  });
});