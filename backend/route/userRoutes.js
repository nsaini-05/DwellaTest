const express = require('express')
const router = express.Router()
const {test} = require('../controllers/authController')


router.route('/m').get(test);



module.exports = router