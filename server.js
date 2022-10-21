const app = require('./app');
const mongoose = require('mongoose');

//connecting to the database
mongoose.connect('mongodb://localhost:27017/lam').then(con =>{
    console.log('MongoDB on')
}).catch(err =>{
    console.log(err);
});

/*
{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open',()=>{
    console.log('MongoDB on');
});
*/

//running the server
const port = 8080;
app.listen(port,function(){
    console.log(`Listening on port ${port}`);;
});
