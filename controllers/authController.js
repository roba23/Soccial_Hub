import { checkauthentication } from "../middlewares.js";
import { connectDB } from "../config/db.js";
import passport from "passport";
export async function userLogin(req,res,next){
   
    passport.authenticate('local', (err,user,info)=>{
        if(err) return next(err);
        if(!user){
            const message = encodeURIComponent(info.message);
            console.log("message:", info.message);
            return res.redirect(`/login?error=${message}`);
        }
        
        if(req.body.remember){
          req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;
            
        }
        else{
            req.session.cookie.expires = false;
            req.session.cookie.maxAge = null;
            console.log("uncheked");
        }
        req.logIn(user,async (err)=>{
            if(err) return next(err);
            return res.redirect("/");
        });
    })(req,res,next);
}

export async function getHomepage(req,res,next){
    
     let db = await connectDB();
        try{
        let userArr = [req.user.username];
        let friends = [];
        if(req.user.friends){
            userArr = userArr.concat(req.user.friends);
            friends  = req.user.friends;
        }
        if(req.user.friendRequestReceived){
            userArr = userArr.concat(req.user.friendRequestReceived);
        }
        if(req.user.friendRequestSent){
            userArr = userArr.concat(req.user.friendRequestSent);
        }
       
     
        let users = await db.collection('users').aggregate([
            {$match:
                {username: {$nin: userArr}}
            },
            {
                $limit: 5
            }
        ]).toArray();
        
        let postFrom = [...friends, req.user.username];        
        let data = await db.collection('posts').aggregate([
            {
                $match: {
                postUsername: {$in: postFrom }
            }
        },
            {
                $sort: {
                    postDate: -1
                }

            },
            {
                $limit: 20
            }
        ]).toArray();
       
        
        res.render("index.ejs", {data: data,users:users,user:req.user,friendRequest: req.user.friendRequestReceived});
    }
    catch(error){
        console.error("error:", error);
    }




}
