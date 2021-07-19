const express = require('express')
const router = express.Router()
const {registerListing,deleteListing, getAllListings,getCityListings}  = require('../controllers/listingController')







router.route('/create').post(registerListing);
router.route('/delete/:id').delete(deleteListing);
router.route('/:city').get(getCityListings);

router.route('/all').get(getAllListings);


module.exports = router