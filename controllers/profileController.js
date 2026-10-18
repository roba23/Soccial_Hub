import { getProfile } from "../models/profileModel.js";

export async function profile(req,res){
    getProfile();
    res.render("profile.ejs");
}