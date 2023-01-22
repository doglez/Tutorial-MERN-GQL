import mongoose from "mongoose";
import { MONGO_URL } from "../config/Config";

const dbConnect = async () => {
    const conn: typeof mongoose = await mongoose.connect(MONGO_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`.green);
};

export default dbConnect;
