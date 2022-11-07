const app = require('./app');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connecting to the database
mongoose.connect('mongodb://localhost:27017/lam').then(con =>{
    console.log('MongoDB on')
}).catch(err =>{
    console.log(err);
});


//running the server
const port = 8080;
app.listen(port,function(){
    console.log(`Listening on port ${port}`);;
});
