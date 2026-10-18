import express from 'express';
import { checkauthentication } from '../middlewares.js';
import passport from 'passport';
import { connectDB} from '../config/db.js';
import { getHomepage, userLogin } from '../controllers/authController.js';
const router = express.Router();
const db = await connectDB();

router.get("/", checkauthentication,getHomepage );





router.get("/login", (req,res)=>{

    res.render("login.ejs");
});

router.post("/login", userLogin);

export default router;