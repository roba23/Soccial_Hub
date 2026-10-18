import express from "express";
import { showMessage } from "../controllers/messagesController.js";
import { sendMessage } from "../controllers/messagesController.js"


const router = express.Router();



router.get("/messageBoard", showMessage);

router.post("/sendmessage",sendMessage );

export default router;
