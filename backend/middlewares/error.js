const ErrorHandler = require('../utils/errorHandler');
module.exports = (error,req,res,next) =>
{

   
    
if(error.name === 'ValidationError'){
    error.statusCode = 400

}

error.statusCode = error.statusCode || 500;
error.message = error.message || "Internal Server Error";
res.status(error.statusCode).json({
success : false,
error : error.message 
})
}