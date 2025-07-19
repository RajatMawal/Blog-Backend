import jwt from "jsonwebtoken"
import User from "../model/User.js"




export const protect = async(req,res,next)=>{
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: 'No token. Unauthorized' });
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user =  await User.findById(decoded.user).select("-password")
    next()
  } catch (error) {
    return res.status(403).json({message:"Invalid token"})
  }
}