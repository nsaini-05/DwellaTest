const express = require('express')
const router = express.Router()
const {registerListing,deleteListing}  = require('../controllers/listingController')







router.route('/create').post(registerListing);
router.route('/delete/:id').delete(deleteListing);


module.exports = router