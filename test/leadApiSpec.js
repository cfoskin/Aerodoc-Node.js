'use strict';

process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../index');
const fixtures = require('../resources/fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;

let leads = fixtures.leads;
const leadsUrl = '/aerodoc/rest/leads/';
var leadId;
const mongoose = require('mongoose');

describe('Lead API Integration Tests', () => {
    before((done) => {
        mongoose.connection.collections['leads'].drop((err) => {
            console.log('test db reset');
        });
        done();
    });

    it('Should create a new lead', (done) => {
        var lead = leads[2];
        supertest(app)
            .post(leadsUrl)
            .send(lead)
            .end((err, res) => {
                expect(res.body).to.have.property("name", "lead3");
                expect(res.body).to.have.property("location", "Kilkenny");
                expect(res.body).to.have.property("phoneNumber", "3333");
                expect(res.body).to.have.property("saleAgent", "agent3");
                expect(res.statusCode).to.be.equal(201);
                leadId = res.body.id;
                done();
            });
    });

      it('Should not create a new lead', (done) => {
        var badLead = {
        "loginName": "bob",
        "statusbad": "STANDBY",
        "latitude": 0,
        "longitude": 0
    }
        supertest(app)
            .post(leadsUrl)
            .send(badLead)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });

    it('Should get all leads', (done) => {
        supertest(app)
            .get(leadsUrl)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should get no leads', (done) => {
        supertest(app)
            .get(leadsUrl)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should not get a lead', (done) => {
        supertest(app)
            .get(leadsUrl + 'madeupLead')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });

    it('Should get one lead', (done) => {
        supertest(app)
            .get(leadsUrl + leadId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should delete one lead', (done) => {
        supertest(app)
            .delete(leadsUrl + leadId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });

      it('Should not delete non existent lead', (done) => {
        supertest(app)
            .delete(leadsUrl +'madeupLead')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            });
    });
});
