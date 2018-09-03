const path = require('path');
const express = require('express');


const app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname, "views/about.html"));
});

app.get('/protected', function(req, res){
    res.send("Access Denied: Please Login");
});

app.listen(5000);

console.log("Running at port 5000. See it at http://localhost:5000");