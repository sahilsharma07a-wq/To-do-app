import express from "express";
import cors from "cors";
const app=express();

// middlewares for parsing the data from the frontend
// app.use(express.static('_frontend'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://127.0.0.1:3000",
    credentials:true,
}));
// router entry point 
import userRouter from "./routes/router.routes.js"

// routes declaration
app.use("/users",userRouter);

// http://localhost:4000/users/register
export {app};