const express = require('express')
const app = express()
const ErrorHandler = require('./utils/errorHandler');
var cookieParser  = require('cookie-parser');

const dotenv = require('dotenv')
dotenv.config({path:'../DWELLATEST/backend/config/config.env'})

app.use(cookieParser());
//For getting data
app.use(express.json());


//Importing middlewares
const errorMiddleWare = require('./middlewares/error');



//Importing routes
const user =  require('./route/userRoutes.js')
const listing =  require('./route/listingRoutes.js')





app.use('/',user)
app.use('/listing',listing)
app.use(errorMiddleWare);
module.exports  = app;