import {Router} from "express"
import express from "express"
import {validate} from "../middleware/validator.middleware.js"
import {registerUser, loginUser} from "../controllers/auth.controller.js"
import {userRegisterValidator}from "../validators/index.js"

const router = express.Router()

router.post("/register",userRegisterValidator(), validate, registerUser)
router.get("/login", loginUser)

export default router