const Listing = require("../models/listing");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const axios = require("axios");
const API_URL = "http://api.positionstack.com/v1/forward";
const API_KEY = "7f105532f75a759567c0a782116094a8";

exports.registerListing = catchAsyncErrors(async (req, res, next) => {
  const { address, city } = req.body;
  const FULL_API_URL = `${API_URL}?access_key=${API_KEY}&query==${address}`;

  try {
    const resp = await axios.get(FULL_API_URL);
    const { data } = resp.data;
    var { latitude, longitude } = data[0];
  } catch (error) {
    return next(new ErrorHandler("Invalid Inputs"));
  }

  req.body.latitude = latitude;
  req.body.longitude = longitude;

  const listing = await Listing.create(req.body);

  res.status(201).json({
    success: true,
    listing,
  });
});
