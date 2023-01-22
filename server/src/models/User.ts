import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    displayName: string;
    matchPassword(enteredPass: string): Function;
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

// Ecrypt password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = function (enteredPass: string) {
    return bcryptjs.compare(enteredPass, this.password);
};

export default mongoose.model("User", UserSchema);
