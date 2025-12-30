const { MongoClient } = require("mongodb");
require("dotenv")

const client = new MongoClient(process.env.DB_URI);

let db;

async function connectDatabase(){
    try {
        await client.connect();
        db = client.db("eventsDatabase")
        console.log("DB connected")
        
    } catch (err) {
        console.log("DB connection failed", err);
        process.exit(1);
    }
}

function getDB(){
    if(!db){
        throw new Error("DB not initilized")
    }
    return db;
}

module.exports ={
    connectDatabase,
    getDB

}
