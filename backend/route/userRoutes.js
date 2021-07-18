const express = require('express')
const router = express.Router()
const {registerUser , loginUser, updatePassword} = require('../controllers/authController')

const {isAuthenticatedUser} = require('../middlewares/auth')

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);
router.route('/update/password').post(isAuthenticatedUser,updatePassword);




module.exports = router