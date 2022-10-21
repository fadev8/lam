const http = require('http');
const path = require('path');
const express = require('express');
const route = require('./routes/routes');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

//creating express app
const app = express();
//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});



//defining middle ware
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"views"));

app.use(express.static(path.resolve(__dirname,"public")));
app.use("/postimg",express.static(path.resolve(__dirname,"postimg")))
app.use(morgan('common'));
app.use(bodyparser.urlencoded({extended:false}));
app.use('/users',userRoute);
app.use('/posts',postRoute);
app.use(route);

 
module.exports = app;
