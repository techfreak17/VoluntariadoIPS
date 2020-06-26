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
      .end(function(req, res) {
        assert.equal(req.body.title, 'Titulo');
      });
  });

  it('TEST Read Project', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Projects/editProject/:id')
      .send({
        title: "Titulo"
      })
      .end(function(req, res) {
        assert.equal(req.body.title, 'Titulo');
      });
  });

  it('TEST Update Project', function () {
    chai.request(server)
      .post('http://localhost:3000/api/Projects/updateProject/:id')
      .type('form')
      .send({
        title: "Titulo",
        synopsis: "Lorem Ipsum"
      })
      .end(function(req, res) {
        assert.equal(req.body.title, 'Titulo');
        assert.equal(req.body.synopsis, 'Lorem Ipsum');
      });
  });

  it('TEST Delete Project', function () {
    it('TEST Read Project', function () {
      chai.request(server)
        .post('http://localhost:3000/api/Projects/deleteProject/:id')
        .send({
          id: ""
        })
        .end(function(req, res) {
          assert.equal(req.body.title, '');
        });
    });
  })
});


describe('Testar Utilizadores', function () {
  it('TEST Create Users', function () {

  });

  it('TEST Read Users', function () {

  });

  it('TEST Update Users', function () {

  });
  
  it('TEST Delete Users', function () {

  });

});