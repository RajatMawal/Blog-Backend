import Blog from "../model/Blog.js"
import Comments from "../model/Comment.js"

export const addComment = async (req,res)=>{
    try {
        const {blog,name,content} = req.body
        console.log(blog,name,content)

        if(!blog || !name || !content)
            return res.status(400).json({message:"all fields are required"})
        
        const addComment =  await Comments.create({blog,name,content})

        res.status(201).json({
           addComment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

export const getBlogComments = async(req,res)=>{
    try {
        const {id} = req.body
        if (!id) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

        const getComment = await Comments.find({blog:id,isApproved:true}).sort({createdAt:-1})
        res.json({getComment})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}




