require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const authRoutes = require('./routes/auth');
//connect to DB
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    console.log("Database Connected");
});

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY Routes
app.use('/api',authRoutes);

//Port
const port = process.env.PORT || 300;
app.get('/',function(req,res){
    res.send('hello word');
});

//server Listening
app.listen(port,()=>{
    console.log(`Your app is listening on ${port} app`);
})
