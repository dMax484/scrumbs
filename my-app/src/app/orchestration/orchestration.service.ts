/*
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

//pull in connection string ENV
//db name
//

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   

 }
 */