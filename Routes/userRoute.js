import express from "express"
import { logoutUser, userLogin, userRegister } from "../controllers/userController.js"
import { protect } from "../Middleware/authMiddelware.js"


const userRoute = express.Router()

userRoute.post("/register",protect,userRegister)
userRoute.post("/login",userLogin)
userRoute.get("/logout",protect,logoutUser)


export default userRoute