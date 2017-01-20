'use strict';

const supertest = require('supertest');
const app = require('../index');
const fixtures = require('./fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;
const pushConfigs = fixtures.pushConfigs;
const pushConfigUrl = '/aerodoc/rest/pushConfig/';
var pushConfigId;

describe('Push Configuration API Integration Tests', () => {
    it('Should create a new Push Configuration', (done) => {
        var pushConfig = pushConfigs[0];
        supertest(app)
            .post(pushConfigUrl)
            .send(pushConfig)
            .end((err, res) => {
                expect(res.body).to.have.property("pushApplicationId", "test");
                expect(res.body).to.have.property("masterSecret", "secret");
                expect(res.body).to.have.property("serverURL", "testURL");
                expect(res.body).to.have.property("active", true);
                expect(res.statusCode).to.be.equal(201);
                pushConfigId = res.body._id;
                done();
            });
    });

    it('Should get all Push Configs', (done) => {
        supertest(app)
            .get(pushConfigUrl)
            .end((err, res) => {
                expect(Array.isArray(res.body));
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should get one Push Config', (done) => {
        supertest(app)
            .get(pushConfigUrl + pushConfigId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    });

    it('Should update a Push Config', (done) => {
        supertest(app)
            .put(pushConfigUrl + pushConfigId)
            .send({ pushApplicationId: 'newId' })
            .end((err, res) => {
                let pushConfig = res.body;
                expect(res.body).to.have.property("pushApplicationId", "newId");
                expect(res.body).to.not.have.property("pushApplicationId", "test");
                done();
            });
    });

    it('Should delete one Push Config', (done) => {
        supertest(app)
            .delete(pushConfigUrl + pushConfigId)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(204);
                done();
            });
    });

});
