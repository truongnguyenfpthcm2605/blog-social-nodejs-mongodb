import mongoose from "mongoose";
import { Gender } from "../utils/GenderE";
export interface Iuser{
    name : String,
    age : Number,
    major: String,
    gender : String,
    classes : mongoose.Schema.Types.ObjectId
}
const userSchema  = new mongoose.Schema<Iuser>(
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

export const usermodel = mongoose.model<Iuser>("user",userSchema );