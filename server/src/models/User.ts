import mongoose from "mongoose";

export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    displayName: string;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "UserName is required."],
            trim: true,
        },
        password: {
            type: String,
            select: false,
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
            lowercase: true,
        },
        displayName: {
            type: String,
            required: [true, "Display name is required."],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", UserSchema);
