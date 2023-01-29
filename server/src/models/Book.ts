import mongoose from "mongoose";

export interface IBook {
    _id: string;
    title: string;
    authors: [mongoose.Schema.Types.ObjectId];
    prefacio: string;
    publisher: string;
    publication_date: Date | null;
    pages: number;
    price: number;
    isbn: string;
    image_url: string;
    resume: string;
    other_related: [mongoose.Schema.Types.ObjectId];
    averageRating: number;
}

const BookSchema = new mongoose.Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true,
            maxlength: [50, "Title can not be more than 50 characters."],
            minlength: [3, "Title must be at least 3 characters."],
        },
        authors: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Writer",
            required: true,
        },
        prefacio: {
            type: String,
            required: [true, "Prefacio is required."],
            trim: true,
            maxlength: [700, "Prefacio can not be more than 700 characters."],
            minlength: [200, "Prefacio must be at least 200 characters."],
        },
        publisher: {
            type: String,
            required: [true, "Publisher is required."],
            trim: true,
            maxlength: [50, "Publisher can not be more than 50 characters."],
            minlength: [3, "Publisher must be at least 3 characters."],
        },
        publication_date: Date || null,
        pages: {
            type: Number,
            ref: "User",
            required: true,
        },
        price: {
            type: Number,
            ref: "User",
            required: true,
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required."],
            trim: true,

            maxlength: [15, "ISBN can not be more than 13 digits."],
            minlength: [10, "ISBN must be at least 10 digits."],
        },
        image_url: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                "Please use a valid URL with HTTP or HTTPS",
            ],
        },
        resume: {
            type: String,
            required: [true, "Prefacio is required."],
            trim: true,
            maxlength: [700, "Prefacio can not be more than 700 characters."],
            minlength: [200, "Prefacio must be at least 200 characters."],
        },
        other_related: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Book",
        },
        averageRating: {
            type: Number,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating must can not be more than 5"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Reverse populate with virtuals
BookSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "book",
    justOne: false,
});

export default mongoose.model("Book", BookSchema);
