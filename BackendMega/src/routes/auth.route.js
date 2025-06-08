import {Router} from "express"
import express from "express"
import {validate} from "../middleware/validator.middleware.js"
import {registerUser, loginUser, verifyingUser, getProfile, logOutUser} from "../controllers/auth.controller.js"
import {userLoginValidator, userRegisterValidator}from "../validators/index.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",userRegisterValidator(), validate, registerUser)
router.get("/login", userLoginValidator(), validate, loginUser)
router.get("/verify/:token", verifyingUser)
router.get("/profile",isLoggedIn, getProfile)
router.post("/logout", isLoggedIn, logOutUser)

export default router