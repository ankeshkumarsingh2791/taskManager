import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.modles.js"; // fixed typo
import { emailVerificationMailGenContent } from "../utils/mail.js";
import jwt from "jsonwebtoken";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

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

  const verificationUrl = newUser.generateEmailToken();
  newUser.emailVerificationToken = verificationUrl.hashedToken;
  await newUser.save();

  await emailVerificationMailGenContent(newUser.username, verificationUrl.hashedToken);

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

export { registerUser, loginUser, verifyingUser, getProfile, logOutUser };
