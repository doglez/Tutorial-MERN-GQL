import mongoose from "mongoose";

interface IWriterSchema {
    id: string;
    name: string;
    born: Date;
    died: Date;
    nationality: string;
    occupation: [string];
    works: [string];
    image_url: string;
    biography: string;
}

const WriterSchema = new mongoose.Schema<IWriterSchema>(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [50, "Name can not be more than 50 characters."],
            minlength: [3, "Name must be at least 3 characters."],
        },
        born: Date,
        died: Date,
        nationality: {
            type: String,
            required: [true, "Nationality is required."],
            trim: true,
            maxlength: [50, "Nationality can not be more than 50 characters."],
            minlength: [3, "Nationality must be at least 3 characters."],
        },
        occupation: {
            type: [String],
        },
        works: {
            type: [String],
        },
        image_url: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                "Please use a valid URL with HTTP or HTTPS",
            ],
        },
        biography: {
            type: String,
            required: [true, "Biography is required."],
            trim: true,
            maxlength: [700, "Biography can not be more than 700 characters."],
            minlength: [200, "Biography must be at least 200 characters."],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Writer", WriterSchema);
