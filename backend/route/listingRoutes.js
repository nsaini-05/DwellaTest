const express = require('express')
const router = express.Router()
const {registerListing,deleteListing,getAllListings,getCityListings,updateListing,filteredSearch, delisting, getMarketListing}  = require('../controllers/listingController')


router.route('/create').post(registerListing);
router.route('/delete/:id').delete(deleteListing);
router.route('/all').get(getAllListings);
router.route('/update/:id').put(updateListing);
router.route('/').get(filteredSearch)
router.route('/delisting/:id').put(delisting)
router.route('/city/:city').get(getCityListings)
router.route('/market').get(getMarketListing)
module.exports = router