const express = require('express')
const router = express.Router()
const {registerListing,deleteListing, allListing}  = require('../controllers/listingController')







router.route('/create').post(registerListing);
router.route('/delete/:id').delete(deleteListing);
router.route('/all').get(allListing);


module.exports = router