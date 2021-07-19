const express = require('express')
const router = express.Router()
const {registerListing}  = require('../controllers/listingController')







router.route('/create').post(registerListing);

module.exports = router