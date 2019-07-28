const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();

chai.use(chaiHttp);

describe('Home Message', () => {
    it ('Should Print Home Message', (done) =>{
        chai.request(server).get('/').end((err,res) =>{
            res.text.should.be.eql('We have your Names Here');
            done();
        });
    });
    it ('Should Print All Names', (done) =>{
        chai.request(server).get('/api/names').end((err,res) =>{
            res.text.should.be.eql('Sorry, No Names Here');
            done();
        });
    });
});