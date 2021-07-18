const express = require('express')
const app = express()
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