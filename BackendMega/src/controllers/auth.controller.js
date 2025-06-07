import {asyncHandler} from "../utils/ayncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.modles.js"
import {emailVerificationMailGenContent} from "../utils/mail.js"

const registerUser = asyncHandler( async (req, res) => {
   const {email, username, password, role} = req.body;
   // checking data is available or not
   if(!email || !username || !password){
      throw new ApiError(401, "All fields are required")
   }
   // checking user is pre register or not
   const existingUser = await User.findOne({email});
   if(existingUser){
      throw new ApiError(401, "User allReady exists")
   }

   const newUser = await User.create({
      email,
      username,
      role,
      password
   })
   if(!newUser){
      throw new ApiError(401, "Something is wrong while saving user")
   }
  
   // const token = crypto.randomBytes(32).toString("hex")
   // newUser.emailVerificationToken = token;
   

   
   await newUser.save()
   const verificationUrl = newUser.generateEmailToken()
   emailVerificationMailGenContent(newUser.username, verificationUrl.hashedToken )

   res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser
   })
   




})

export {registerUser}
