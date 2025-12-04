import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Load environment variables
dotenv.config();

//Create the Express app
const app = express();

//Setup routes here

//Enable CORS for the frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

//Start server using Render Port or local dev
const Port = process.env.PORT || 5000;

app.listen(Port);
console.log("ALevel is running on port: " + Port);