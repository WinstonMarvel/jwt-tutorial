const path = require('path');
const express = require('express');


const app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get('/protected', function(req, res){
    res.sendFile(path.join(__dirname, "views/protected.html"));
});

app.listen(5000);