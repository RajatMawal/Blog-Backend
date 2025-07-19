import express from "express"
import { protect } from "../Middleware/authMiddelware.js"
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, togglePublish} from "../controllers/blogController.js"
import upload from "../Middleware/multer.js"


const blogRoute = express.Router()

blogRoute.post("/addBlog",protect,upload.single("image"),addBlog)
blogRoute.get("/allBlogs",getAllBlogs)
blogRoute.get("/:blogId",getBlogById)
blogRoute.post("/delete",protect,deleteBlogById)
blogRoute.post("/toggle-publish",protect,togglePublish)





export default blogRoute