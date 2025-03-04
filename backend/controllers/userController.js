import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model.js";
import { sendEmail } from '../config/emailUtils.js'; // Import the sendEmail function from the utils
import { response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
export const saveUser = async (req, res, next) => {
  try {
    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 10);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const userId = uuidv4();

    // Check if this is the first user being created
    const isFirstUser = (await User.countDocuments()) === 0;

    const userDto = new User({
      userId: userId,
      email: req.body.email,
      name: req.body.name,
      displayName: req.body.name,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      type: isFirstUser ? "Admin" : "User", // First user is Admin, others are Users
      password: hash,
      savedAt: Date.now(),
      profileImg: req.body.profileImg,
      isActive: true,
      isDeactived: false,
    });

    await userDto.save();

    return res.status(201).json({
      success: true,
      data: {
        userId: userDto.userId,
        username: userDto.name,
        email: userDto.email,
        phoneNumber: userDto.phoneNumber,
        gender: userDto.gender,
        type: userDto.type,
        profileImg: userDto.profileImg,
      },
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return next(error);
  }
};


export const loginUser = async (req, res, next) => {
    try {
 
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        {
          userId: user.userId,
          username: user.name,
          email: user.email,
          type: user.type,
        },
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Token expiry time
      );
  
      // Respond with user data and the generated token
      return res.status(200).json({
        success: true,
        data: {
          userId: user.userId,
          username: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          type: user.type,
          profileImg: user.profileImg, 
          token: token, 
        },
      });
  
    } catch (error) {
      console.error('Error logging in user:', error);
      return next(error);
    }
  };


  export const forgotPassword = async (req, res, next) => {
    
    try {
      const { email } = req.body;
      console.log("Forgot Password Request Received for:", email); // Debugging
  
      // Check if email is provided
      if (!email) {
        console.error("Email is required");
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.error("User not found for email:", email);
        return res.status(404).json({ message: "User not found" });
      }
      
      // Generate a JWT reset token
      const resetToken = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
  
      // Generate reset link
      const frontendURL = process.env.VITE_API_BASE_URL;
      console.log("frontendURL", process.env.VITE_API_BASE_URL); 
      const resetLink = `${frontendURL}/reset-password/${resetToken}`;

      console.log("Generated Reset Link:", resetLink); // Debugging
  
      // Send email
      const subject = "Password Reset Request";
      const text = `Click on the following link to reset your password: ${resetLink}`;
      const html = `<p>Click on the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`;
  
      await sendEmail(email, subject, text, html);
      
      console.log("Reset email sent successfully");
  
      res.status(200).json({ message: "Reset link sent to your email." });
    } catch (error) {
      console.error("Error in forgot password:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  export const resetPassword = async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
  
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      await User.updateOne({ userId: decoded.userId }, { password: hashedPassword });
  
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error in reset password:", error);
      res.status(400).json({ message: "Invalid or expired token." });
    }
  };
  