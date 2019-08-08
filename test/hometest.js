const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();

chai.use(chaiHttp);

let name = [{name: "Ashwin"}];

describe('Home Message', () => {
    it ('Should Print Home Message', (done) =>{
        chai.request('http://localhost:3107').get('/').end((err,res) =>{
            res.text.should.be.eql('We have your Names Here');
            done();
        });
    });
    
    it ('Should Print No Names', (done) =>{
        chai.request('http://localhost:3107').get('/api/names').end((err,res) =>{
            res.text.should.be.eql('Sorry, No Names Here');
            done();
        });
    });
    it ('It should Post Names', (done) =>{
        chai.request('http://localhost:3107').post('/api/names').send(name[0]).end((err,res) =>{
            res.should.have.status(200);
            done();
        });
    });
    it ('It Should Find a Name Inserted', (done) =>{
        chai.request('http://localhost:3107').get('/api/names/1').end((err,res) =>{
            res.body.should.have.property('name');
            done();
        });
    }); 
});