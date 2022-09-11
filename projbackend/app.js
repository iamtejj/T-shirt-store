const express = require('express')

const app = express();
const port = 300;

app.get('/',function(req,res){
    res.send('hello word');
});

app.listen(port,()=>{
    console.log(`Your app is listening on ${port} app`);
})
