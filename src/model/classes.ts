import mongoose from "mongoose";

export interface Iclasses {
    name : string,
    room : string
}
const classesSchema  = new mongoose.Schema<Iclasses>(
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

export const classesmodel = mongoose.model<Iclasses>("classes", classesSchema );