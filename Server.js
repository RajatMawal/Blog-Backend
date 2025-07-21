import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./Configs/db.js"
import userRoute from "./Routes/userRoute.js"
import blogRoute from "./Routes/BlogRoute.js"
import commentsRoute from "./Routes/commentRoute.js"
import adminRoute from "./Routes/adminRoute.js"
import cookieParser from "cookie-parser"
import authVerify from "./Routes/authcheckRoute.js"
import searchRoute from "./Routes/searchRoute.js"

const app = express()
const Port = process.env.PORT || 9000


app.use(express.json())
app.use(cors(
  {
  // origin: 'http://localhost:5173',
  origin:"https://blog-frontend-five-navy.vercel.app",
  credentials: true
}
))
app.use(cookieParser());

connectDB()
app.get("/",(req,res)=>{
    res.send("hello backend")
})


app.use("/api/user",userRoute)
app.use("/api/blog",blogRoute)
app.use("/api/comment",commentsRoute)
app.use("/api/admin",adminRoute)
app.use("/api/auth",authVerify)
app.use("/api",searchRoute)






app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`)
})