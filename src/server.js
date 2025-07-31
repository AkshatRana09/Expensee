import express from "express";
import dotenv, { parse } from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js"; 
import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();
const app = express();
//middleware
app.use(ratelimiter);
app.use(express.json());
const PORT = process.env.PORT || 5001;


app.use("/api/transactions", transactionsRoute);


initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port :",PORT);
    });
});