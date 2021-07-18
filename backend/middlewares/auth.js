const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('Login to access this resource'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id)
    req.user = user;
    next();
})

