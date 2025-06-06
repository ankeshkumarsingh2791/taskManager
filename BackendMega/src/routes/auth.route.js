import {Router} from "express"
import {validate} from "../middleware/validators.middleware.js"
import {registerUser} from "../controllers/auth.controller.js"
import {userRegisterValidator}from "../validators/index.js"

const router = Router()

router.route("/register").post(userRegisterValidator(), validate, registerUser)

export default router