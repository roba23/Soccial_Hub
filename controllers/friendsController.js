import { acceptRequest, sendRequest } from "../models/friendModel.js";


export async function requestAccept(req,res){
    console.log("the accepted:", req.body.username);
        console.log("accepted by:", req.user.username);
        let rBy = req.body.username;
        let aBy = req.user.username;

        await acceptRequest(aBy,rBy);
        res.redirect("/");


}

export async function requestSend(req,res){
    sendRequest(req);
    res.redirect("/");


}
export async function listFriends(req,res){
    res.render("friends.ejs", { friends: req.user?.friends ?? [] })
}
