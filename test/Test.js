const { expect, assert } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../server');


describe('Testar Projetos', function () {
  it('TEST Create Project', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Projects/createProject')
      .type('form')
      .send({
        title: "Titulo",
        synopsis: "Lorem Ipsum",
        intervationArea: "Lorem Ipsum",
        target_audience: "Lorem Ipsum",
        objectives: "Lorem Ipsum",
        description: "Lorem Ipsum",
        date: "21/08/2020",
        interestAreas: "Lorem Ipsum",
        photo: "",
        observations: "Lorem Ipsum",
        relatedEntities: "Lorem Ipsum",
        responsibleID: "Lorem Ipsum",
        requiredFormation: "Lorem Ipsum",
        formation: "Lorem Ipsum"
      })
      .end(function (req, res) {
        assert.equal(req.body.title, 'Titulo');
      });
  });

  it('TEST Read Project', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Projects/editProject/:id')
      .send({
        title: "Titulo"
      })
      .end(function (req, res) {
        assert.equal(req.body.title, 'Titulo');
      });
  });

  it('TEST Update Project', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Projects/updateProject/:id')
      .type('form')
      .send({
        title: "Title",
        synopsis: "Ipsum Lorem"
      })
      .end(function (req, res) {
        assert.equal(req.body.title, 'Title');
        assert.equal(req.body.synopsis, 'Ipsum Lorem');
      });
  });

  it('TEST Delete Project', function () {
    it('TEST Read Project', function () {
      chai.request(server)
        .post('http://localhost:3000/api/Projects/deleteProject/:id')
        .send({
          id: ""
        })
        .end(function (req, res) {
          assert.equal(req.body.title, '');
        });
    });
  })
});


describe('Testar Utilizadores', function () {
  it('TEST Create Users', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Admin/createVoluntaryUser')
      .type('form')
      .send({
        name: 'Name',
        email: 'Lorem Ipsum',
        phone: 'Lorem Ipsum',
        address: 'Lorem Ipsum',
        birthDate: 'Lorem Ipsum',
        memberIPS: 'Lorem Ipsum',
        schoolIPS: 'Lorem Ipsum',
        courseIPS: 'Lorem Ipsum',
        interestAreas: 'Lorem Ipsum',
        reasons: 'Lorem Ipsum',
        observations: 'Lorem Ipsum',
        authorization: 'Lorem Ipsum',
        listProjects: 'Lorem Ipsum',
        userID: 'Lorem Ipsum'
      })
      .end(function (req, res) {
        assert.equal(req.body.name, 'Name');
      });
  });

  it('TEST Read Users', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Admin/getCompanyUsers')
      .send({
        name: "Nome"
      })
      .end(function (req, res) {
        assert.equal(req.body.title, 'Nome');
      });
  });

  it('TEST Update Users', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Admin/updateUser/:id')
      .type('form')
      .send({
        name: "Nome",
        email: "Ipsum Lorem"
      })
      .end(function (req, res) {
        assert.equal(req.body.title, 'Nome');
        assert.equal(req.body.synopsis, 'Ipsum Lorem');
      });
  });

  it('TEST Delete Users', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Admin/deleteUser/:id')
      .send({
        id: ""
      })
      .end(function (req, res) {
        assert.equal(req.body.title, '');
      });
  });

});