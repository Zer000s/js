require("dotenv").config()
const path = require('path')
const express = require('express')
const app = express()
var sqlite = require('sqlite-sync');
const { doesNotReject } = require("assert")

app.use(express.json());

app.post("/createuser", async (req,res) => 
{
  try 
  {
    const user = req.body.user.log;
    const hashedPassword = req.body.user.pas;
    sqlite.connect('./db/dbb.sqlite3');
    sqlite.run(`INSERT INTO users VALUES('${user}','${hashedPassword}')`);
    sqlite.close();
    res.json({success:"Вы успешно зарегистрированы"});
  }
  catch (err)
  {
    res.json({success:"Вы успешно зарегистрированы"});
  }
})

app.post("/getuser", async (req,res) => 
{
  try
  {
    const user = req.body.user.log;
    const hashedPassword = req.body.user.pas;
    sqlite.connect('./db/dbb.sqlite3');
    var result = sqlite.run(`SELECT pas FROM users where log = '${user}' and pas ='${hashedPassword}'`);
    sqlite.close();
    res.json(result);
  }
  catch (err)
  {
    res.json({success:err});
  }
})

app.get('/getuserdata', async (req, res) => {
  try 
  {
    sqlite.connect('./db/dbb.sqlite3');
    var result = sqlite.run("SELECT log,pas FROM users");
    res.json(result);
    sqlite.close();
  }
  catch (err) 
  {
      res.send('Error ', err)
  }
});

app.listen(3000, () => { 
console.log(`Authorization Server running on 3000`)
})