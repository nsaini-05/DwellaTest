const Listing = require("../models/listing");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

const axios = require("axios");
const API_URL = "http://api.positionstack.com/v1/forward";
const API_KEY = process.env.KEY;

//localhost:3000/listing/create
exports.registerListing = catchAsyncErrors(async (req, res, next) => {
  const { address, city } = req.body;
  const FULL_API_URL = `${API_URL}?access_key=${API_KEY}&query==${address}`;

  try {
    const resp = await axios.get(FULL_API_URL);
    const { data } = resp.data;
    var { latitude, longitude } = data[0];
  } catch (error) {
    return next(
      new ErrorHandler("Unable to find Cordinates. Try with different address")
    );
  }
  req.body.latitude = latitude;
  req.body.longitude = longitude;
  const listing = await Listing.create(req.body);

  res.status(201).json({
    success: true,
    listing,
  });
});
//localhost:3000/listing/delete/id
exports.deleteListing = catchAsyncErrors(async (req, res, next) => {
  const listing = await Listing.findById({ _id: req.params.id });
  if (!listing) {
    return next(new ErrorHandler("No Such listing", 404));
  }

  await listing.remove();
  res.status(200).json({
    success: true,
  });
});

//localhost:3000/listing/all
exports.getAllListings = catchAsyncErrors(async (req, res, next) => {
  const listings = await Listing.find();

  res.status(200).json({
    listings,
  });
});

//localhost:3000/listing/city
exports.getCityListings = catchAsyncErrors(async (req, res, next) => {
  const listings = await Listing.find({ city: req.params.city });

  if (!listings) {
    return next(new ErrorHandler(`No Listings in ${req.params.city}`, 404));
  }
  res.status(200).json({
    listings,
  });
});

//localhost:3000/listing/update/id
exports.updateListing = catchAsyncErrors(async (req, res, next) => {
  const { address, city } = req.body;
  const FULL_API_URL = `${API_URL}?access_key=${API_KEY}&query==${address}`;
  try {
    const resp = await axios.get(FULL_API_URL);
    const { data } = resp.data;
    var { latitude, longitude } = data[0];
  } catch (error) {
    return next(
      new ErrorHandler("Unable to find Cordinates. Try with different address")
    );
  }
  req.body.latitude = latitude;
  req.body.longitude = longitude;
  const updatedListingData = {
    title: req.body.title,
    address: req.body.address,
    price: req.body.price,
    city: req.body.city,
    owner: req.body.owner,
    type: req.body.type,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };

  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    updatedListingData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//localhost:3000/listing?city=&price[gte]=&price[lte]=
exports.filteredSearch = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Listing.find(), req.query)
    .search()
    .filter();
  let listings = await apiFeatures.query;
  res.status(200).json({
    success: true,
    listings,
  });
});

//localhost:3000/listing/delisting/60f5a06f350ca225a0ec7805
exports.delisting = catchAsyncErrors(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ErrorHandler("Invalid Listing Id"));
  }

  listing.inMarket = !listing.inMarket;
  listing.save();

  res.status(200).json({
    success: true,
    listing,
  });
});

//localhost:3000/listing/market
exports.getMarketListing = catchAsyncErrors(async (req, res, next) => {
  const listings = await Listing.find({ inMarket: true });
  res.status(200).json({
    listings,
  });
});
