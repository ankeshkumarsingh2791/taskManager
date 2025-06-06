import {body} from "express-validator"

const userRegisterValidator = () =>{
    return [
        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage('Email is valid'),
        body('username')
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({min: 3}).withMessage("username should be at least 3 char")
        .isLength({max: 16}).withMessage("username can not exceed 16 char"),
        body('password')
        .trim()
        .notEmpty().withMessage("password is required")

    ]
}

const userLoginValidator = () => {
    return [
        body('email')
        .isEmail().withMessage("Email is not valid")
        .notEmpty().withMessage("Email is required"),
        body("password")
        .notEmpty().withMessage("password cant be empty")
    ]
}

export {userRegisterValidator, userLoginValidator}