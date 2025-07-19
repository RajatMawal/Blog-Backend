import express from "express"
import { authCheck } from "../controllers/authController.js"
import { protect } from "../Middleware/authMiddelware.js"

const authVerify = express.Router()

authVerify.get("/check",protect,authCheck)

export default authVerify