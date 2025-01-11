import express from "express";
import { saveUser, loginUser,  forgotPassword, resetPassword  } from "../controllers/userController.js";

const router = express.Router();


router.post("/sign-up/", saveUser);
router.post('/login', loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
