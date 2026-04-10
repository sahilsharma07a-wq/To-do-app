import express from "express";

const app=express();

// middlewares for parsing the data from the frontend
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// router entry point 
import userRouter from "./routes/router.routes.js"

// routes declaration
app.use("/users",userRouter);

// http://localhost:4000/users/register
export {app};