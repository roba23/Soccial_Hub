import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {Strategy as LocalStrategy}  from "passport-local";
import { ObjectId } from "mongodb";
import 'dotenv/config';
import { getDb, connectDB } from "./db.js";
import { findUserByEmail, findUserById } from "../models/userModel.js";

const db = await connectDB();
export default function configure(passport){
    passport.serializeUser((user,done)=>{
   if(user._id){
  
      return done(null, {id: user._id, type: 'local'});
   }
    return done(null,user);
});
passport.deserializeUser(async function(sessionkey,done){
    
    try{
        if(sessionkey.type === 'local'){
             let user = await db.collection('users').findOne({_id: new ObjectId(sessionkey.id)}, {projection: { fullname: 1, email: 1, username: 1, birthdate: 1, friends: 1,friendRequestReceived:1, friendRequestSent:1}});
        if(!user){
            return done(null,error);
        }
     return  done(null,user);
        }
        if(sessionkey.type === 'google'){
            return done(null,user);
        }
       
    }
    catch(error){
        done(error);
    }
});


passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},async function(username,password,done){
    try{
        let user = await findUserByEmail(username);
        if(!user){
            return done(null,false,{message: "user not found"});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return done(null,false,{message: "incorrect password"});
        }
        return done(null,user);
    }
    catch(error){
        return done(error);
    }
}));

      passport.use(new GoogleStrategy({
        clientID: process.env.client_id,
        clientSecret: process.env.client_secret,
        callbackURL: '/auth/google/secrets'
    }, async (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));
}

