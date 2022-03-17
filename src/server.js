'use strict';

const express =require ('express');
const app = express();

require('dotenv').config();
const v1=require('./routes/v1')
const v2=require('./routes/v2')
const errorhandler=require('./error-handlers/500');
const notfoundpage=require('./error-handlers/404');


app.use(express.json()); //  method inbuilt in express to recognize the incoming Request Object as a JSON Object.

app.use(v1);
app.use(v2);

app.get('/',(req,res)=>{
    res.send('server is alive')
})

app.use(errorhandler);
app.use('*',notfoundpage);



function start (port) {
    app.listen(port ,()=>{
    
        console.log(`i'm listening to ${port}`)
    });
    }  


module.exports = {
    app: app,
    start: start
}