const express = require('express')
const router = express.Router()
const {registerUser} = require('../controllers/authController')


router.route('/signup').post(registerUser);



module.exports = router