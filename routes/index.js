import postRoutes from "./postRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import messageRoutes from "./messageRoutes.js";
import friendsRoutes from "./friendRoutes.js";
import express from "express";


const router = express.Router();


router.use("", friendsRoutes);
router.use("", messageRoutes);
router.use('', postRoutes);
router.use('/users', userRoutes);
router.use("", authRoutes);
router.use("/message", messageRoutes)
export default router;