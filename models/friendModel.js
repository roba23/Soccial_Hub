import { connectDB } from "../config/db.js";


export async function acceptRequest(aBy,rBy){
    let db = await connectDB();

    try{
        await Promise.all([
           // accepted by 
            db.collection('users').updateOne({username: aBy},
            {$push: {friends: rBy},
           $pull: {friendRequestReceived:rBy} }),
           //req.body.username the accepted request
         db.collection('users').updateOne({username:rBy},
             {$pull: {friendRequestSent: aBy},
             $push: {friends: aBy}}
        )
        ]);
        
      }
      catch(error){
        console.log("there is an error:", error);
    
      }
}

export async function sendRequest(req){
    let db =  await connectDB();
     
        try{
            console.log("the id of the request reciever is: ", req.body.id);
           
            await Promise.all([
                db.collection('users').updateOne({_id: req.user._id},
                    {$push: {friendRequestSent: req.body.username}}
                ),
                db.collection('users').updateOne({_id: new ObjectId(req.body.id)},
                    {
                        $push: {friendRequestReceived: req.user.username}
                    }
                )
            ]);
            return;
        }
        catch(error){
            console.error("error:", error);
            return;
        }
}