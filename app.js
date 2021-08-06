const http = require('http');
const path = require('path');
const express = require('express');
const route = require('./routes/routes');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

//creating express app
const app = express();
//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect('mongodb://localhost:27017/lam',{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open',()=>{
    console.log('MongoDB on');
});


//defining middle ware
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"views"));

app.use(express.static(path.resolve(__dirname,"public")));
app.use("/postimg",express.static(path.resolve(__dirname,"postimg")))
app.use(morgan('common'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(route);

 
//running the server
const port = 8080;
app.listen(port,function(){
    console.log('Listening on port ${port}');;
});
