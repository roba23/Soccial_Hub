import { ObjectId } from "mongodb";
import { getDb } from "../config/db.js";

export async function findUserByEmail(email){
    const db = await getDb();
    return await db.collection('users').findOne({email: email});
}

export async function findUserById(id){
    const db = await getDb();
    return await db.collection('users').findOne({_id: new ObjectId(id)});
}

export async function registerUser(req,formattedDate, hashed){
    const db = await getDb();
    try{
       await db.collection('users').insertOne({
             fullname: req.body.fullname,
             email: req.body.email,
             username: req.body.username,
             birthdate: formattedDate,
             password: hashed
       });
       return true;
    }
    catch(error){
      if(error.code === 11000){
        const duplicateFields = Object.keys(error.keyValue);
        console.log("inside the error:", req.body);
        
        return ({taken: duplicateFields[0],
            data: req.body
        });
       
      }

    }

}