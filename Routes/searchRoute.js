import express from "express";
import Blog from "../model/Blog.js";

const searchRoute = express.Router();

searchRoute.get("/search", async (req, res) => {
  try {
    const { category } = req.query;

    console.log("Search Query:", category);

    if (!category) {
      return res.status(400).json({ message: "Please provide a search category." });
    }

    const result = await Blog.find({
      category: { $regex: category, $options: "i" }
    });


    res.status(200).json({ result });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default searchRoute;
