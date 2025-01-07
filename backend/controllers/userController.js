import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model.js";
import { response } from 'express';

export const saveUser = async (req, res, next) => {
  try {
    // Hash the password 
    const hash = await bcrypt.hash(req.body.password, 10);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const userId = uuidv4();

    // Create a new user object
    const userDto = new User({
      userId: userId,
      email: req.body.email,
      name: req.body.name,
      displayName: req.body.name,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      type: "User", // Default type is User
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
      // Destructure email and password 
      const { email, password } = req.body;
  
      // Find the user in the database by email
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
          token: token, // Include the JWT token
        },
      });
  
    } catch (error) {
      console.error('Error logging in user:', error);
      return next(error);
    }
  };
