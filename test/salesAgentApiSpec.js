'use strict';

const supertest = require('supertest');
const app = require('../index');
const fixtures = require('./fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;
let salesAgents = fixtures.salesAgents;
//different endpoint for one sales agent
const OnesalesAgentUrl = '/aerodoc/rest/salesagents/';
const salesAgentsUrl = '/aerodoc/rest/saleagents/';
var salesAgentId;

describe('Sales Agent API Integration Tests', () => {
    it('Should create a new Sales Agent', (done) => {
        var salesAgent = salesAgents[3];
        supertest(app)
            .post(salesAgentsUrl)
            .send(salesAgent)
            .end((err, res) => {
                expect(res.body).to.have.property("loginName", "agent1");
                expect(res.body).to.have.property("password", "123");
                expect(res.body).to.have.property("location", "Waterford");
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
            .get(OnesalesAgentUrl + salesAgentId)
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
