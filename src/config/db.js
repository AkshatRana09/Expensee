import {neon} from "@neondatabase/serverless";
import "dotenv/config";
//SQL connection create karega using DB URL
export const sql = neon(process.env.DATABASE_URL);

export async function initDB(){
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY Key,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("DATABASE INITIALIZED successfully");
    }catch(error){
        console.log("Error f DB:", error);
        process.exit(1);//1 failure aur 0 success
    }
}
