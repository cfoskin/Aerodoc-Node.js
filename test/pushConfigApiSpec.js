'use strict';

process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const app = require('../index');
const fixtures = require('../resources/fixtures.json');
const should = require('chai').should;
const expect = require('chai').expect;
const pushConfigs = fixtures.pushConfigs;
const pushConfigUrl = '/aerodoc/rest/pushconfig/';
var pushConfigId;
const mongoose = require('mongoose');

describe('Push Configuration API Integration Tests', () => {
    before((done) => {
        mongoose.connection.collections['pushconfigs'].drop((err) => {
            console.log('test db reset');
        });
        done();
    });

    it('Should not create a new Push Configuration', (done) => {
        var badPushConfig = {
        "masterSecret": "secret",
        "active": "false"
    };
        supertest(app)
            .post(pushConfigUrl)
            .send(badPushConfig)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(500);
                done();
            });
    });

     it('Should create a Push Configuration', (done) => {
        var pushConfig = pushConfigs[0];
        supertest(app)
            .post(pushConfigUrl)
            .send(pushConfig)
            .end((err, res) => {
                expect(res.body).to.have.property("pushApplicationId", "test");
                expect(res.body).to.have.property("masterSecret", "secret");
                expect(res.body).to.have.property("serverURL", "testURL");
                expect(res.body).to.have.property("active", false);
                expect(res.statusCode).to.be.equal(201);
                pushConfigId = res.body.id;
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

    it('Should not get non existent Push Config', (done) => {
        supertest(app)
            .get(pushConfigUrl+'badConfigId')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(404);
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

    it('Should not update a non existent Push Config', (done) => {
        supertest(app)
            .put(pushConfigUrl + 'badId')
            .send({ pushApplicationId: 'newId' })
            .end((err, res) => {
                 expect(res.statusCode).to.be.equal(404);
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
