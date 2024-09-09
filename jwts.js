const express = require("express");
const jwt = require("jsonwebtoken")
const JWT_SECRET ="cvanshisinlove"
const app = express();

app.use(express.json());

const users = [];

function generatetoken() {
  return Math.random();

  //we can use another logic to generate a token as per our choice by definig a different function
}

app.post("/signup", function (req, res) {
  //input validation using ZOD

  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  res.json({
    message: "you are signed in",
  });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  


      let foundUser = null ;
      for (let i = 0 ; i < users.length ; i++){
        if ( users [i].username ==username && users[i].password==password){
            foundUser =users[i]
        }
      }

    if (foundUser){
        const token = jwt.sign({
            username : username 

        },JWT_SECRET) ; //convert the username into jwt  
        
        // foundUser.token =token;
        res.json({
            token : token
        })
    }
    else{
        res.status(403).send({
            message :"Invalid username or password"
        })
    }
   
  
});

//this syntax helps to return the value of the user data by seeeing the token generated after the signup
app.get ("/me" , function (req ,res){
    const token =req.headers.token //jwt
    const decodeinformation =jwt.verify(token ,JWT_SECRET);
    //this line of code is used in converting 
    const username =decodeinformation.username


// in the line of code below we are hopping to the databse to know the password of the user because the passowrd is not stored in the jwts ...
    let foundUser =null;
    for ( let i =0 ; i< users.length ; i++){
        if (users[i].username == token){
            foundUser =users[i]
        }
    }
    if (foundUser){
        res.json({
            username :foundUser.username ,
            password : foundUser.password
        })
        
    }
    else{
        res.json({
            message : "token invalid"
        })
    }




})
app.listen(3000);
