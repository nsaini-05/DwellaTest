const express = require('express')
const app = express()

//Importing routes

const user =  require('./route/userRoutes.js')

app.use('/',user)

module.exports  = app;