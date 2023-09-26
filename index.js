const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 4000;
const path = require('path')

//convert data in json form
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

//testing route
app.get('/',(req,res)=>{
    res.send("this is tesing route")
})

//router
const userrouter = require('./route/userrote');   
app.use('/',userrouter); 


app.use('/profile',express.static('uploads'))

app.listen(port,(req,res)=>{
    console.log(`api is running at http://localhost:${port}`);
})