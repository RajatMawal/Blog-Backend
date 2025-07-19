import mongoose from "mongoose"

const commentsSchema = new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    isApproved:{
        type:Boolean,
        required:true,
        default:true
    }
},{timestamps:true})


export default mongoose.model("Comments",commentsSchema)