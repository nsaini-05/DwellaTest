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




exports.loginUser = catchAsyncErrors(async(req,res,next) =>{
    const{email , password} = req.body;
    if(!email || !password)
{
return next((new ErrorHandler("Please enter email & password", 404)))
}

const user = await User.findOne({ email}).select('+password')
if(!user)
{
return next((new ErrorHandler("Invalid Email or Password", 401)))
}

const isPasswordMatched = await user.comparePassword(password)

if(!isPasswordMatched)
{
return next(new ErrorHandler("Invalid Password" , 401))
}


res.status(201).json({
    success: true,
}) 



})