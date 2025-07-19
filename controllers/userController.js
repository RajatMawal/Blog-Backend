import User from "../model/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config"

export const userRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already registered" });
    }

    user = await User.create({ email, password, name });

    jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) return res.status(500).json({ message: "Token generation error" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      }
    );

  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "invalid credentials" });

    jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) return res.status(500).json({ message: "Token generation error" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const logoutUser = async (req,res)=>{
 try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "logout Sucessfully" });
 } catch (error) {
    res.status(500).json({ message: "server error" });
 }
}