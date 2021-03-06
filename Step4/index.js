const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// We use cookie parser to store the JSON webtoken on the client side within a cookie. Once a cookie is sent to the client, the browser will always use this cookie while communicating with the server.
const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

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

    var tokendata = "";
   
    //First we'll check if the cookie exists
    if(req.cookies.token){
         // If it exists we'll verify if the token is genuine and store the decoded data into tokendata.
         // Note: Ideally the token data should contain the userID and not a 'loggedIn' variable
        tokendata = jsonwebtoken.verify(req.cookies.token, "myAmazingSecret");
    }
    
    // Once we have data from the decoded token, we'll send the page.
    if(tokendata.loggedIn)
        res.sendFile(path.join(__dirname, "views/protected.html"));

    else    
        res.send("Access Denied: Please Login");

});


app.post('/', function(req,res){
    //If the login is successful, then the server takes you to the home page. Otherwise, "Wrong Password" is returned.
    if(req.body.username == "winston" && req.body.password == "mydogsmellsbadtoday"){
        console.log("Authenticated successfully");
        // Just before redirecting users to the home page, what we'll do now is create a token for the user.
        const token = jsonwebtoken.sign({loggedIn: true}, "myAmazingSecret");
        // We'll set a cookie on the client and store the token in it.
        res.cookie("token", token).sendFile(path.join(__dirname, "views/index.html"));
    }
    else{
        res.send("Wrong Password");
    }
});

app.listen(5000);

console.log("Running at port 5000. See it at http://localhost:5000");