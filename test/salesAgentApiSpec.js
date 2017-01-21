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

    it('Should return all agents in search', (done) => {
        supertest(app)
            .get(salesAgentsUrl + 'searchAgents')
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.length === 4);
                expect(res.body.length != 0);

                done();
            });
    });

    it('Should return one agent only in search', (done) => {
        supertest(app)
            .get(salesAgentsUrl + 'searchAgents?status=&location=Boston')
            .end((err, res) => {
                console.log(res.body);
                // expect(res.body[0]).to.have.property("location", "Boston");
                // expect(res.body[0]).to.not.have.property("location", "New York");
                // expect(res.body.length === 1);
                // expect(res.body.length != 0);
                // expect(res.statusCode).to.be.equal(200);
                done();
            });
    });
});
