import { connectDB } from "../config/db.js";


export async function getMessage(req){
    let db =  await connectDB();
     try{
        let message = [];
        
        if(req.query.sendTo){
            message = await db.collection('messages').aggregate([
        {$match: {$or:   
                [
                    {$and: [{sentBy: req.user.username},  {sentTo: req.query.sendTo}]},
                    {$and: [{sentBy: req.query.sendTo}, {sentTo: req.user.username}]}
                ]   
            }
        },
        {$sort: {date: -1}},
        {$limit: 3},
        

        
      ]).toArray();
      
        }
      
        return message;
      
    }
    catch(error){
        console.error(error);
    }
 

}

