import bcrypt from "bcrypt";
import { findUserByEmail} from "../models/userModel.js";
import { registerUser } from "../models/userModel.js";
import session from "express-session";


export async function userRegister(req,res){
    console.log(req.body);
  
    let formattedDate = new Date(req.body.birthdate);
    console.log("the body: ", req.body);
    console.log("date is:", formattedDate);
    let hashed = await bcrypt.hash(req.body.password,10);
    let result = await registerUser(req, formattedDate,hashed);
    console.log("The result is:", result);
    if(result){
        res.redirect("/");
    }
    if(result.data){
            res.render("register.ejs",
            { taken: duplicateFields[0],
               data: req.body
            }
        )

    }
    

}
export async function getRegister(req,res){
    const takenField = req.query.taken;
        console.log("taken: ", takenField);
        
        res.render("register.ejs");
}
export async function userLogout(req,res){
    req.session.destroy();
    res.clearCookie("social-hub.io");
    res.redirect("/");
}