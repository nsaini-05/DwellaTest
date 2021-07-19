const mongoose = require("mongoose");
const validator = require("validator");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");







const listingSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: [true, "Please enter listing title"]
  },
  address: {
      type: String,
      required: true,
    },
  
  city: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter the listing Price"],
    min: 0.0,
  },

  owner: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: [true, "Please Select the listing type"],
    enum: {
      values: ["residential", "commercial", "industrial"],
      message: "Please select the correct category",
    },
  },
  
    'latitude':{
      type : String
    },
    'longitude':{
      type : String
    }
  
});











listingSchema.pre("save", async function (next) {
   
  if (!this.isModified("city" || "address")){
      next();
    } 
    
  });


  const Listing = mongoose.model("Listing", listingSchema);
  module.exports = Listing;
  
