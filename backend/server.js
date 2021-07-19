const app  = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'../DWELLATEST/backend/config/config.env'})



//Connecting connectDatabase
const connnectDatabase = require('./config/database')
connnectDatabase();



app.listen(process.env.PORT , function(req,res){
    console.log(`Server started on port number : ${process.env.PORT} in ${process.env.NODE_ENV}`)
})