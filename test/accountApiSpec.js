'use strict';

const supertest = require('supertest');
const app = require('../index');
const fixtures = require('./fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;

let salesAgents = fixtures.salesAgents;
const logInUrl = '/aerodoc/rest/login/';
const salesAgentsUrl = '/aerodoc/rest/saleagents/';
var salesAgentId;

describe('Account Agent API Integration Tests', () => {

      before((done) => {
      var salesAgent = salesAgents[3];
        supertest(app)
            .post(salesAgentsUrl)
            .send(salesAgent)
            .end((err, res) => {
                salesAgentId = res.body._id;
                done();
            });
  });

 after((done) => {
      supertest(app)
            .delete(salesAgentsUrl + salesAgentId)
            .end((err, res) => {
                done();
            });
  });

    it('Should log in an existing Sales Agent', (done) => {
        var salesAgent = salesAgents[3];
        supertest(app)
            .post(logInUrl)
            .send(salesAgent)
            .end((err, res) => {
                expect(res.body).to.have.property("loginName", "agent1");
                expect(res.body).to.have.property("password", "123");
                expect(res.body).to.have.property("location", "Waterford");
               expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should not log in an invalid Sales Agent', (done) => {
        var invalidSalesAgent = salesAgents[2];
        supertest(app)
            .post(logInUrl)
            .send(invalidSalesAgent)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });

    it('Should not log in existing Sales Agent with a wrong password', (done) => {
        var salesAgent = salesAgents[1];
        supertest(app)
            .post(logInUrl)
            .send(salesAgent)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(401);
                done();
            });

    });
})
