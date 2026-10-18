import { getMessage} from "../models/messageModel.js";
import { getIo } from "../socket.js";


export async function showMessage(req,res){
    let message = [];
    message = await  getMessage(req,message);
    
    return res.render("messages.ejs",{friends: req.user.friends, sendTo: req.query.sendTo,sentBy: req.user.username, data: message });
    

}

export async function sendMessage(req,res){
    
    return res.redirect(`messageBoard?sendTo=${req.body.sendTo}`);
}