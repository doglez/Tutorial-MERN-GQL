import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_EXPIRE, JWT_SECRET } from "../config/Config";
import crypto from "crypto";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    password: string;
    resetPassToken: string;
    resetPassTokenExpire: Date;
    getSignedJwtToken(): string;
    matchPassword(password: string): Promise<boolean>;
    getResetPassToken(): string;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            maxlength: [50, "Name can not be more than 50 characters."],
            minlength: [3, "Name must be at least 3 characters."],
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
        role: {
            type: String,
            enum: ["user", "publisher", "admin"],
            default: "user",
        },
        phone: {
            type: String,
            trim: true,
            maxlength: [15, "Phone can not be more than 50 characters."],
            minlength: [3, "Phone must be at least 3 characters."],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            select: false,
        },
        resetPassToken: String,
        resetPassTokenExpire: Date,
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.pre("save", function () {
    const splitStr = this.name.toLowerCase().split(" ");

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    this.name = splitStr.join(" ");
});

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
        algorithm: "HS512",
    });
};

UserSchema.methods.matchPassword = function (enteredPass: string) {
    return bcryptjs.compare(enteredPass, this.password);
};

UserSchema.methods.getResetPassToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPassToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPassTokenExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Reverse populate with virtuals
UserSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "user",
    justOne: false,
});

export default mongoose.model("User", UserSchema);
