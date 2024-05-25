import mongoose from "mongoose";
import { Gender } from "../utils/GenderE";

const userSchema  = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        major: {
            type: String,
            require: true
        },
        gender : {
            type: String,
            enum : Gender,
            require : true
        },
        classes : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "classes",
            require : true
        }
    },
    {
        timestamps: true
    });

export const usermodel = mongoose.model("user",userSchema );