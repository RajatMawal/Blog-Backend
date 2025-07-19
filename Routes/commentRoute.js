import express from "express"
import { addComment, getBlogComments } from "../controllers/commentsController.js"

const commentsRoute = express.Router()

commentsRoute.post("/addComment",addComment)
commentsRoute.post("/allComments",getBlogComments)

export default commentsRoute