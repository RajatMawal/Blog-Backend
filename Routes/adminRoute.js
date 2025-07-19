import express from "express"
import {  approveComments, deleteComments, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js"
import { protect } from "../Middleware/authMiddelware.js"

const adminRoute = express()


adminRoute.get("/blogs",protect,getAllBlogsAdmin)
adminRoute.get("/comments",protect,getAllComments)
adminRoute.post("/delete-comments",protect,deleteComments)
adminRoute.post("/approve-comments",protect,approveComments)
adminRoute.get("/dashboard",protect,getDashboard)




export default adminRoute


