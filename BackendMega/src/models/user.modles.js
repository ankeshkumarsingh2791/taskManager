import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
const UserSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localPath: String
        },
        default: {
            url:`https://placehold.co/600*400`,
            localPath: ""
        },

    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
        name: {
        type: String,
        
       
    },
     password: {
        type: String,
        required: true,
       
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
       type: String,

    },
    forgotPasswordExpiry: {
        type: Date
    },
    refreshToken: {
       type: String 
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    }

}, {timestamps: true})


// hashing password before saving in Schema 
UserSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
// compere password
UserSchema.methods.isPasswordCorrect = async function(password){
    return  await bcrypt.compare(password, this.password)
}

// access and refresh token

UserSchema.methods.generateAccessToken = async function (){
    jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.ACCESS_TOKE_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
)
}

UserSchema.methods.refreshTokens = async function (){
    jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.REFRESH_TOKE_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
)
}

// email verification token 

UserSchema.methods.generateEmailToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString("hex")
     const hashedToken = crypto.createHash("sha256")
    .update(unHashedToken)
    .digest("hex")
    const tokenExpiry = Date.now() + (20*60*1000)
    return {unHashedToken, hashedToken, tokenExpiry}
}

export const User = mongoose.model("User", UserSchema)