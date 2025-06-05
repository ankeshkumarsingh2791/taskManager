import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
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
     fullname: {
        type: String,
        required: true,
       
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

export const User = mongoose.model("User", UserSchema)