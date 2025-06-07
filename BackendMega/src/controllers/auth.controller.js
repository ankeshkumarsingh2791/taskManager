import {asyncHandler} from "../utils/ayncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.modles.js"
import {emailVerificationMailGenContent} from "../utils/mail.js"
import jwt from "jsonwebtoken"

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
   

   
   const verificationUrl = newUser.generateEmailToken()
   await newUser.save()
   emailVerificationMailGenContent(newUser.username, verificationUrl.hashedToken )

   res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser
   })
   




})

const loginUser = async(req, res) => {
   const {email, password} = req.body;
   if(!email || !password){
      throw new ApiError(401, "all fields are required")
   }
   try {
      const user = await User.findOne({email});
      if(!user){
         throw new ApiError(401, "Invalid credentials");
      }

      const isMatched = user.isPasswordCorrect(password)
      if(!isMatched){
         throw new ApiError(401, "invalid Credentials")
      }

      const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET || "shhhhh",{expiresIn: "1d"})
      const cookieOptions = {
         httpOnly: true,
         secure: true,
         maxAge: 24*60*60*1000
      }

      res.cookie("token", jwtToken, cookieOptions)
      res.status(200).json({
         success: true,
         message: "User logged in successfully",
         token: jwtToken,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
         }
      })

   } catch (error) {
      console.log("Login failed ", error)
   }
   
}

export {registerUser, loginUser}
