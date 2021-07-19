const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: [true, "Please enter listing title"],
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
  },

  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter the listing Price"],
    min: 0.0,
  },

  owner: {
    type: String,
    required: true,
    lowercase: true,
  },

  type: {
    type: String,
    required: [true, "Please Select the listing type"],
    enum: {
      values: ["residential", "commercial", "industrial"],
      message: "Please select the correct category",
    },
  },

  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },

  inMarket: {
    type: Boolean,
    default: false,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
