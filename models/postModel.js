import { connectDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export async function postCreate(req){
    let db = await connectDB();
    try{
            db.collection('posts').insertOne({
                postUsername: req.user.username,
                postedBy: req.user.email,
                postBody: req.body.postBody,
                postDate: new Date()
    
            });
            
            
        }
        catch(error){
            console.error("error in creating post:", error);
        }
        

}
export async function post_interaction(req){
    const db = await  connectDB();
    
     try{
        let field = "";
        if(req.body.action === "like"){
            field = "likes";
             await db.collection('posts').updateOne({_id: new ObjectId(req.body.postId)},
        {
            $inc: {likes: 1}
        }
         
    );
        }
        else{
            field = "dislikes";
             await db.collection('posts').updateOne({_id: new ObjectId(req.body.postId)},
        {
            $inc: {dislikes: 1}
        }
         
    );
        }
       
    
    
}
    catch(error){
        console.error("line 132 userRoutes.js:", error);
    }
    
    
   
}