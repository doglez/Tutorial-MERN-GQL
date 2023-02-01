import mongoose from "mongoose";

export interface IToken {
    id: string;
    user: mongoose.Schema.Types.ObjectId;
    token: string;
    status: string;
}

const TokenSchema = new mongoose.Schema<IToken>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["enable", "disable"],
            default: "enable",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("Token", TokenSchema);
