const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send('heeloo this is home page')
});

const admin = (req,res)=>{
    return res.send('this is admin dashboard')
}
const isLoggedIn = (req,res,next) =>{
    console.log('Is logged in');
    next();
}
const isAdmin = (req,res,next)=>{
    console.log('admin is running');
    next();
}

app.get('/admin',isAdmin,isLoggedIn,admin);

app.get('/login', (req, res) => {
    return res.send('heeloo this is Login page')
});


app.listen(8080, () => {
    console.log('app is running at 8080 port')
})