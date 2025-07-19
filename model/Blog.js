import mongoose from "mongoose"


const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    subtitle:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        enum: ["startup", "lifeStyle", "finance", "technology"],
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    isPublished:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

export default mongoose.model("Blog",BlogSchema)