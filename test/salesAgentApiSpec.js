'use strict';

process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../index');
const fixtures = require('../resources/fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;
let salesAgents = fixtures.salesAgents;
//different endpoint for one sales agent
const OnesalesAgentUrl = '/aerodoc/rest/salesagents/';
const salesAgentsUrl = '/aerodoc/rest/saleagents/';
var salesAgentId;
const mongoose = require('mongoose');

describe('Sales Agent API Integration Tests', () => {
    before((done) => {
        mongoose.connection.collections['salesagents'].drop((err) => {
            console.log('test db reset');
        });
        done();
    });

    it('Should create a new Sales Agent', (done) => {
        var salesAgent = salesAgents[3];
        supertest(app)
            .post(salesAgentsUrl)
            .send(salesAgent)
            .end((err, res) => {
                expect(res.body).to.have.property("loginName", "john");
                expect(res.body).to.have.property("password", "123");
                expect(res.body).to.have.property("location", "New York");
                expect(res.statusCode).to.be.equal(201);
                salesAgentId = res.body.id;
                done();
            });
    });

    it('Should not create a bad Sales Agent', (done) => {
        var badAgent = {
            "location": "New York",
            "status": "STANDBY",
            "latitude": 0,
            "longitude": 0
        }
        supertest(app)
            .post(salesAgentsUrl)
            .send(badAgent)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(500);
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

    it('Should not get a non existent Sales Agent', (done) => {
        supertest(app)
            .get(OnesalesAgentUrl)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
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

    it('Should return no agents in search', (done) => {
        supertest(app)
            .get(salesAgentsUrl + 'searchAgents?status=&location=Africa')
            .end((err, res) => {
                expect(res.body.length === 0);
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    // it('Should update a sales agent', (done) => {
    //     supertest(app)
    //         .put(salesAgentsUrl + salesAgentId)
    //         .send({ location: 'new location' })
    //         .end((err, res) => {
    //             expect(res.body).to.have.property("location", "new location");
    //             expect(res.statusCode).to.be.equal(200);
    //             done();
    //         });
    // });

    it('Should not update a sales agent', (done) => {
        supertest(app)
            .put(salesAgentsUrl)
            .send({ location: 'new location' })
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
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

    it('Should not delete non existent Sales Agent', (done) => {
        supertest(app)
            .delete(salesAgentsUrl)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });
});
