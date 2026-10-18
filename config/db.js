import {MongoClient} from "mongodb";
import 'dotenv/config';
const url = process.env.MONGO_URI;
const dbName = process.env.dbName;
const client = new MongoClient(url);
if (!url || !dbName) {
    throw new Error("MONGO_URI is missing from environment variables.");
}
let db;
export async function connectDB(){
    if (db) return db;
   
    try{
         await client.connect();
        db =  client.db(dbName);
        console.log("succesfully connected to MOngoDb")
        
    return db;
    }
    catch(error){
        console.error("error connectiong to db:", error);
        process.exit(1);
    }
    
   
  
}

export function getDb(){
    if(!db) throw new Error('Database not initialized call connectDB first');    return db;
    return db;
}