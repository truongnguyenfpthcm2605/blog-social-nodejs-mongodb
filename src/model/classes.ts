import mongoose from "mongoose";

const classesSchema  = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        room: {
            type: String,
            require: true
        }

    },
    {
        timestamps: true
    }
);

export const classesmodel = mongoose.model("classes", classesSchema );