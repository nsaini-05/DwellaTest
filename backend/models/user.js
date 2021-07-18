const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')




const userSchema = new mongoose.Schema({
    fullName : {
        type :  String,
        required : [true , "Please enter your name"],
        maxLength : [30 , "Your name cannot exceed 30 Characters"],
        minLength  : [1 , "Invalid Name"]
    },
    email:{
        type : String,
        required : [true , 'Please enter your email'],
        unique :  [true , 'Email is already signed up'],
        validate : {
            validator : validator.isEmail,
            message : `{VALUE} is not a valid email`,
            isAsync : false
        }
    },
    userName:{
        type : String,
        required : [true , 'Please enter username'],
        unique :  [true , 'username already taken'],
       },
    password : {
        type : String,
        required : [true , "Please enter the password"],
        minLength : [6 , "Password cannot be less than 6 Characters"],
        select : false
    },
    phoneNumber: {
        type: String,
        required : [true , 'Please enter Phone Number']
      },

      address:{
        unit: {
            type: String,
            required: true,
          },
        
        street: {
            type: String,
            required: true,
          },

        city: {
            type: String,
            required: true,
          },
        postalCode: {
            type: String,
            required: true,
          },

    
    }







    
})


//Encrypting Password before saving user
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})


const User = mongoose.model('User',userSchema)
module.exports = User