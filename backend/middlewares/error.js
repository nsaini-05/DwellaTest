const ErrorHandler = require('../utils/errorHandler');
module.exports = (err,req,res,next) =>
{

if(err.name === 'ValidationError'){
    err.statusCode = 400
}

err.statusCode = err.statusCode || 500;
err.message = err.message || "internal Server Error";
res.status(err.statusCode).json({
success : false,
error : err.message 
})
}