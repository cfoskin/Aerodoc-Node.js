'use strict';

const supertest = require('supertest');
const app = require('../index');
const fixtures = require('./fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;

let leads = fixtures.leads;
const leadUrl = '/api/lead/';
const leadsUrl = '/api/leads';
var leadId;

describe('Lead API Integration Tests', () => {

    afterEach(function() {

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
                expect(res.body).to.have.property("salesAgent", "agent3");
                expect(res.statusCode).to.be.equal(201);
                leadId = res.body._id;
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

    it('Should get one lead', (done) => {
        supertest(app)
            .get(leadUrl + leadId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should delete one lead', (done) => {
        supertest(app)
            .delete(leadUrl + leadId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });


});
