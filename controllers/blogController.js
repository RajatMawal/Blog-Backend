import Blog from "../model/Blog.js";
import fs from "fs";
import imagekit from "../Configs/imageKit.js";
import Comments from "../model/Comment.js"

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, isPublished, category } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (
      !title ||
      !subtitle ||
      !description ||
      !imageFile ||
      category === undefined ||
      category === null ||
      category === ""
    )
      return res.status(400).json({ message: "Missing required field" });

    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //optimizing through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //Auto compression,
        { format: "webp" }, // convert to modern format
        { width: "1280" }, // width resizing
      ],
    });

    let blog = await Blog.create({
      title,
      subtitle,
      description,
      image: optimizedImageUrl,
      isPublished,
      category,
    });

    res.status(201).json({
      blog: {
        blog: blog._id,
        title: blog.title,
        subTitle: blog.subtitle,
        description: blog.description,
        image: blog.image,
        isPublished: blog.isPublished,
        category: blog.category,
      },
    });
  } catch (error) {
    console.error("Error in addBlog:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json({
      blogs,
    });
  } catch (error) {
    res.status(500).json("server Error");
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog Not Found" });

    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json("server Error");
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "Blog ID is required" });
    }
    const blog = await Blog.findByIdAndDelete(id);

    //Delete all comments associated with the blog
    await Comments.deleteMany({ blog: id });

    if (!blog) return res.status(404).json({ message: "Blog Not Found" });

    res.status(200).json({ message: "Sucessfully Deleted" });
  } catch (error) {
     console.error("Delete blog error:", error);
    res.status(500).json({ message: "server Error" });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.isPublished = !blog.isPublished;

    await blog.save();

    res.status(200).json({ blogs: blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
};
