const express = require('express');
const TestApp = express();

TestApp.use(express.json());

let names = [];

TestApp.get('/', (req,res) => {
    res.send('We have your Names Here');
});

TestApp.get('/api/names' , (req,res) => {
    if (!names.length)
        res.send('Sorry, No Names Here');
    else
        res.send(names);
});

TestApp.get('/api/names/:id', (req,res) => {
    let name = names[req.params.id - 1];
    if (!name)
        res.status(404).send('Sorry, No Names Here');
    else
        res.send(name);
});

TestApp.post('/api/names', (req,res) => {
    if(!req.body.name){
        res.status(400).send('Name is Required');
    }
    else if(!req.body.name.match(/^[A-Za-z]+$/))
        res.status(400).send('Name Should Only Contain Characters');
    else{
        let newname = {name: req.body.name};
        names.push(newname);
        res.send(newname);
    }
});

const port = process.env.PORT || 3107;
TestApp.listen(port, () => console.log(`Listening to port ${port}...`));