import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import User from "../model/user";

export const collections: { user?: mongoDB.Collection<User> } = {}

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(String(process.env.DB_CONN_STRING));
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const userCollection: mongoDB.Collection<User> = db.collection(String(process.env.GAMES_COLLECTION_NAME));
 
    collections.user = userCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
}
