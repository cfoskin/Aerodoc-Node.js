'use strict';

const supertest = require('supertest');
const app = require('../index');
const fixtures = require('./fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;

let salesAgents = fixtures.salesAgents;
const salesAgentsUrl = '/api/salesAgents/';
var salesAgentId;

describe('Sales Agent API Integration Tests', () => {

    afterEach(function() {

    });

    it('Should create a new Sales Agent', (done) => {
        var salesAgent = salesAgents[0];
        supertest(app)
            .post(salesAgentsUrl)
            .send(salesAgent)
            .end((err, res) => {
                expect(res.body).to.have.property("name", "agent1");
                expect(res.body).to.have.property("password", "secret");
                expect(res.body).to.have.property("location", "Waterford");
                expect(res.body).to.have.property("status", "pto");
                expect(res.statusCode).to.be.equal(201);
                salesAgentId = res.body._id;
                done();
            });
    });

    it('Should get all Sales Agents', (done) => {
        supertest(app)
            .get(salesAgentsUrl)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should get one Sales Agent', (done) => {
        supertest(app)
            .get(salesAgentsUrl + salesAgentId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should delete one Sales Agent', (done) => {
        supertest(app)
            .delete(salesAgentsUrl + salesAgentId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });


});
