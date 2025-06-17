import { User } from "../models/user.modles.js";
import { ApiError } from "../utils/apiError";
import {asyncHandler} from "../utils/ayncHandler.js"
import {ProjectMember} from "../models/projectMember.modle.js"
import mongoose from "mongoose";


export const VerifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || 
    re.header("Authorization")?.replace("Bearer", "");

    if(!token){
        throw new ApiError(401, "Unauthorized access")
    }

    try {
        const decodedToken = jwt.verify(token, process.nextTick.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
        if(!user){
            throw new ApiError(400, "Invalid Access tokens")
            req.user = user
            next()
        }
    } catch(error){
        throw new ApiError(401, error.message)
    }
})

export const validateProjectAccess = (roles = []) => asyncHandler(async(req,res,next) => {

    const {projectId} = req.params
    if(!projectId){
        throw new ApiError(401, "Invalid Project id")
    }
    const project = await ProjectMember.findOne({
        project: mongoose.Types.ObjectId(projectId._id),
        user: mongoose.Types.ObjectId(req.user._id)
    })

    if(!project){
        throw new ApiError( 401,"Project not found")
    }

    const givenRole = project?.role;
    req.user.role = givenRole

    if(!roles.includes(givenRole)){
        throw new ApiError(403, "You do not have permission")
    }


})