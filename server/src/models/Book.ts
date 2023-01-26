import mongoose from "mongoose";

export interface IBook {
    title: String;
    year: Number;
}

const BookSchema = new mongoose.Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            unique: true,
        },
        year: {
            type: Number,
            required: [true, "Year add an email"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Book", BookSchema);
