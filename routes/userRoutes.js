import express from "express";
const router = express.Router();

import {connectDB  } from "../config/db.js";
import { getRegister, userLogout, userRegister } from "../controllers/userController.js";
import { listFriends } from "../controllers/friendsController.js";

import { profile } from "../controllers/profileController.js";


const db = await connectDB();

router.get("/register",getRegister);

router.get("/profile", profile);
router.get("/friends", listFriends)


router.post("/register", userRegister);






router.get("/logout", userLogout);

export default router;