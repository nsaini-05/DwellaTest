const express = require('express')
const router = express.Router()
const {registerListing,deleteListing, getAllListings,getCityListings,updateListing,filteredSearch}  = require('../controllers/listingController')



router.route('/create').post(registerListing);
router.route('/delete/:id').delete(deleteListing);
router.route('/:city').get(getCityListings);
router.route('/all').get(getAllListings);
router.route('/update/:id').put(updateListing);
router.route('/').get(filteredSearch)
module.exports = router