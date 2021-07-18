const express = require('express')
const app = express()

var cookieParser  = require('cookie-parser');
app.use(cookieParser());
//For getting data
app.use(express.json());


//Importing middlewares
const errorMiddleWare = require('./middlewares/error');
app.use(errorMiddleWare);




//Importing routes
const user =  require('./route/userRoutes.js')





app.use('/',user)
app.use(errorMiddleWare);
module.exports  = app;