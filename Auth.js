const express = require("express");
const app = express();

app.use(express.json());

const users = [];
// [
//     {
//         username :"cvansh" , password :"1005" ,token : "0.073454375473"

//     }
// ]

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

  //we need to check whether the username and password is correct ot not

//   const user = users.find(
//     function (u) {
//       if (u.username == username && u.password == password) {
//         return true;
//       } else {
//         return false;
//       }
//     }
// );


    // another syntax to check the credentials:
      let foundUser = null ;
      for (let i = 0 ; i < users.length ; i++){
        if ( users [i].username ==username && users[i].password==password){
            foundUser =users[i]
        }
      }

    if (foundUser){
        const token =generatetoken();
        foundUser.token =token ;
        res.json({
            message : token
        })
    }
   
  
});

//this syntax helps to return the value of the user data by seeeing the token generated after the signup
app.get ("/me" , function (req ,res){
    const token =req.headers.token
    let foundUser =null;
    for ( let i =0 ; i< users.length ; i++){
        if (users[i].token == token){
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
// app.listen(3000);
