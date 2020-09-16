const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');
const cookieParser = require('cookie-parser');

var cors = require('cors')
const app = express();

app.use(cookieParser())
app.use('/public' , express.static('public'));
app.use(express.json());
app.use(cors())


app.set('view engine' ,'ejs');


mongoose.connect('mongodb+srv://test:test@cluster0.wdsct.mongodb.net/ecommerceApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true })
.then(function(){
    try{
    app.listen(8000);
    }
    catch(err)
    {
        console.log(err);
    }
})
.catch(function(err){console.log(err);});


app.use(appRoutes);



