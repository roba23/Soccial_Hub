import express from "express";
import { post_actions } from "../controllers/postController.js";
import { createPost } from "../controllers/postController.js";

const router = express.Router();


router.post("/post-actions", post_actions);
router.get("/messages", (req,res)=>{
    res.render("messages.ejs",{friends: req.user.friends});
})

router.post("/create_post", createPost);


export default router;