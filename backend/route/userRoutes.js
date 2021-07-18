const express = require('express')
const router = express.Router()
const {registerUser , loginUser, updatePassword, updateProfile, deleteUser, getAllUsers , getSingleUser}  = require('../controllers/authController')

const {isAuthenticatedUser} = require('../middlewares/auth')

router.route('/signup').post(registerUser);

router.route('/login').post(loginUser);

router.route('/update/password').post(isAuthenticatedUser,updatePassword);


router.route('/update/profile').post(isAuthenticatedUser,updateProfile);


router.route('/delete/:userName').delete(isAuthenticatedUser,deleteUser);


router.route('/users').get(getAllUsers);

router.route('/find').get(getSingleUser);

module.exports = router