import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.modles.js"; // fixed typo
import { emailVerificationMailGenContent, forgetPasswordMailGenContent, sendMail } from "../utils/mail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role} = req.body;
  console.log(email, username, password)
  if (!email || !username || !password) {
    
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({ email, username, password, role });

  if (!newUser) {
    throw new ApiError(500, "Something went wrong while saving user");
  }

  const verificationUrl = await newUser.generateEmailToken();
  newUser.emailVerificationToken = verificationUrl.hashedToken;
  await newUser.save();
console.log(verificationUrl);

  // emailVerificationMailGenContent(newUser.username, verificationUrl.hashedToken);
  await sendMail({body:verificationUrl.hashedToken,subject:"Registration",email,})

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    })
  );
});

// Verify Email
const verifyingUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Token not found");
  }

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new ApiError(401, "Invalid or expired token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  res.status(200).json(new ApiResponse(200, "User verified"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "shhhhh", {
    expiresIn: "1d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.cookie("token", jwtToken, cookieOptions);

  res.status(200).json(
    new ApiResponse(200, "User logged in successfully", {
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  );
});

// Get User Profile
const getProfile = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, "User profile fetched successfully", { user })
  );
});

// Logout User
const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});

// const forgotPassword = async(req, res) => {
//    const { email } =  req.body;
//   try {
    
//      if (!email){
//         throw new ApiError(401, "all fields are required")
//      }
  
//      const user = await User.findOne({email});
//      if(!user){
//         throw new ApiError(401, "Invalid credentials")
//      }
//      const resetToken = crypto.randomBytes(32).toString("hex");
//      user.forgotPasswordToken = resetToken;
//      user.forgotPasswordExpiry = Date.now()+10*60*1000;
//      await user.save();
  
//      forgetPasswordMailGenContent(user.username, user.forgotPasswordToken)
//      throw new ApiResponse(201, "Email send Successfully")
//   } catch (error) {
//     console.log(error)
//     res.status(401).json({
//       success: false,
//       message:"Something is wrong in forgotPassword",
//       error: error
//     })
//   }
// }

const forgotPassword = async (req, res) => {
  try {
    const  { email }  = req.body

    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = resetToken;
    user.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    forgetPasswordMailGenContent(user.username, resetToken);

    return res.status(201).json({
      success: true,
      message: "Password reset email sent",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in forgotPassword",
      error: error.message,
    });
  }
};

const resetPassword = async(req, res) => {
  try {
    const {token} = req.params;
    const {password, confirmPassword} = req.body;
    if(!password || !confirmPassword || !token){
      throw new ApiError(401, "All fields are required")
    }

    if(password !== confirmPassword){
      throw new ApiError(401, "Password does not same")
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry:{$gt: Date.now()}
    })
    if(!user){
      throw new ApiError(401, "Invalid token or token expiry")
    }

    user.password = password
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save()
    throw new ApiResponse(200, "Password reset successfully")
  } catch (error) {
     throw new ApiError(401, "Something wrong in forgot password")
  }
}

const updateProfileImage = async (req, res) => {
  const { fullname }  = req.body;

}
export { registerUser, loginUser, verifyingUser, getProfile, logOutUser, forgotPassword, resetPassword };
