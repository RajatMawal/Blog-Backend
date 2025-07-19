import Blog from "../model/Blog.js"
import Comments from "../model/Comment.js"


const getAllComments = async(req,res)=>{
    try {
        const allComments = await Comments.find({}).populate("blog").sort({createdAt:-1})

        res.json({allComments})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

 const getAllBlogsAdmin =  async(req,res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt:-1})
        res.json({blogs})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

 const deleteComments = async(req,res)=>{
   try {
     const {id} = req.body;

    await Comments.findByIdAndDelete(id)

    res.status(200).json({message:"comment deleted successfully"})

   } catch (error) {
    res.status(500).json({message:"server error"})
   }

}

 const approveComments = async(req,res)=>{
   try {
    const {id} = req.body;
    const comment = await Comments.findById(id)

    if(!comment) return res.status(404).json({ message: "comment not found" });
        comment.isApproved = !comment.isApproved

        comment.save()
    
    res.status(200).json({message:"comment updated successfully"})

   } catch (error) {
    res.status(500).json({message:"server error"})
   }

}


 const getDashboard = async (req,res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5)
        const blog = await Blog.countDocuments();
        const comments = await Comments.countDocuments()
        const drafts = await Blog.countDocuments({isPublished:false})

        const dashBoardData = {recentBlogs,blog,comments,drafts}

        res.status(200).json({
            dashBoardData
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error"})
    }
}

export {
  getAllBlogsAdmin,
  getAllComments,
  deleteComments,
  approveComments,
  getDashboard
};