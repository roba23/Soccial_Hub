import express from "express";
import { requestAccept, requestSend} from "../controllers/friendsController.js";

const router = express.Router();

router.post("/acceptRequest", requestAccept);
router.post("/addFriend", requestSend);

export default router;