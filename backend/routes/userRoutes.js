import express from "express";
import { saveUser, loginUser } from "../controllers/userController.js";

const router = express.Router();


router.post("/sign-up/", saveUser);
router.post('/login', loginUser);

export default router;
