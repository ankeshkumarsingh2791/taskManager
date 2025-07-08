import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.modles.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.token;

    console.log("checking cookies", req.cookies);
    console.log("token found", token ? "yes" : "no");

    if (!token) {
      throw new ApiError(401, "Unauthorized: Token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "shhhhh");

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware failed");
    console.error("Error:", error);
    next(new ApiError(401, "Authentication failed"));
  }
};

export const whoAmI = async (req, res) => {
  try {
    console.log(req.headers?.token,">>>>>>>>>>>>>");
    
    const token = req.cookies?.token || req.headers?.token;


    if (!token) {
      throw new ApiError(401, "Unauthorized: Token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "shhhhh");

    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user,"All good :)"));

  } catch (error) {
    console.error("Auth middleware failed");
    console.error("Error:", error);
     throw new ApiError(401, "Authentication failed");
  }
};
