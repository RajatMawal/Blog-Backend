import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("database connected")
        })
        let str = process.env.MONGO_URI

        if(!str) 
        console.log("URI is wrong")

        const conn = mongoose.connect(str)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB