import mongoose from "mongoose";

const todoSchema=new mongoose.model({
    contnent:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true});

export const todo=mongoose.model("todo",todoSchema);