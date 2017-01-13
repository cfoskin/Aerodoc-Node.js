'use strict';

const supertest = require('supertest');
const app = require('../index');
const fixtures = require('./fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;

let salesAgents = fixtures.salesAgents;
const logInUrl = '/rest/login/';

describe('Account Agent API Integration Tests', () => {

    it('Should log in an existing Sales Agent', (done) => {
        var salesAgent = salesAgents[0];
        supertest(app)
            .post(logInUrl)
            .send(salesAgent)
            .end((err, res) => {
                expect(res.body).to.have.property("loginName", "jake");
                expect(res.body).to.have.property("password", "123");
                expect(res.body).to.have.property("location", "Boston");
                expect(res.body).to.have.property("status", "STANDBY");
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
