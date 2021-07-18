const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');




exports.registerUser = catchAsyncErrors(async(req,res,next) =>{
    const user  = await User.create(req.body);
    res.status(201).json({
        success: true,
        user
    }) 
    
}
)