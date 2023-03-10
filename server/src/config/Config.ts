import dotenv from "dotenv";
import path from "path";

export const NODE_ENV = String(process.env.NODE_ENV);

const result = dotenv.config({
    path: path.join(__dirname, `../../.env.${NODE_ENV}`),
});

if (result.error) {
    throw result.error;
}

export const HOST_NAME = String(process.env.HOST_NAME);
export const PORT = String(process.env.PORT);
export const CORS_ADMIT_URL = String(process.env.CORS_ADMIT_URL);
export const MONGO_URL = String(process.env.MONGO_URL);
export const JWT_SECRET = String(process.env.JWT_SECRET);
export const JWT_EXPIRE = String(process.env.JWT_EXPIRE);
export const JWT_COOKIE_EXPIRE = Number(process.env.JWT_COOKIE_EXPIRE);
