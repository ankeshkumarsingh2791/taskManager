import {asyncHandler} from "../utils/ayncHandler.js"

const registerUser = asyncHandler( async (req, res) => {
   const {email, username, password, role} = req.body;
   
   if(!email || !password){
    
   }
})

export {registerUser}
