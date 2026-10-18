import { postCreate, post_interaction } from "../models/postModel.js";


export async function createPost(req,res){

     await postCreate(req);
     res.redirect("/");


}

export async function post_actions(req,res){
    await post_interaction(req);
    res.redirect("/");


}