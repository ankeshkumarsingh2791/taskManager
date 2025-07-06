import {Router} from "express"
import express from "express"
import {validate} from "../middleware/validator.middleware.js"
import {registerUser, loginUser, verifyingUser, getProfile, logOutUser, resetPassword, forgotPassword} from "../controllers/auth.controller.js"
import {userLoginValidator, userRegisterValidator}from "../validators/index.js"
import { isLoggedIn, whoAmI } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/who-am-i",whoAmI);
router.post("/register", registerUser)
router.post("/login",  loginUser)
router.get("/verify/:token", verifyingUser)
router.get("/profile",isLoggedIn, getProfile)
router.post("/logout", isLoggedIn, logOutUser)
router.put("/reset-password", forgotPassword)
router.post("/forgot-password", resetPassword)

export default router