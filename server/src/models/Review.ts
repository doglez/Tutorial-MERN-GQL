import mongoose from "mongoose";

export interface IReview {
    _id: string;
    title: string;
    text: string;
    rating: number;
    userId: mongoose.Schema.Types.ObjectId;
    bookId: mongoose.Schema.Types.ObjectId;
}

const ReviewSchema = new mongoose.Schema<IReview>(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true,
            maxlength: [50, "Title can not be more than 50 characters."],
            minlength: [3, "Title must be at least 3 characters."],
        },
        text: {
            type: String,
            required: [true, "Text is required."],
            trim: true,
            maxlength: [500, "Text can not be more than 500  characters."],
            minlength: [20, "Text must be at least 20 characters."],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Rating is required."],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Prevent user from submitting more than one review per book
ReviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
