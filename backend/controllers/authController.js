const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");





exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 404));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    error = new ErrorHandler("Invalid Password", 401);

    return next(error);
  }

  sendToken(user, 200, res);
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //Check previos user password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newuserData = {
    userName: req.body.userName,
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newuserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ userName: req.params.userName });

  if (!user) {
    return next(new ErrorHandler("Invalid User Name", 401));
  }

  await user.remove();

  res.status(200).json({
    success: "true",
  });
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const Users = await User.find();
  res.status(200).json({
    Users,
  });
});

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const { userName } = req.body;
  const user = await User.findOne({ userName: userName });
  if (!user) {
    new ErrorHandler("test", 402);
    return next();
  }

  res.status(200).json({
    user
  });
});
