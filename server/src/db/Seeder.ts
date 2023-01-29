import fs from "fs";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import User from "../models/User";
import dbConnect from "./dbConnect";
import Writer from "../models/Writer";
import Book from "../models/Book";

colors.enable();

dbConnect();

dotenv.config({
    path: path.join(__dirname, `../../.env.development`),
});

const users = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/__data__/users.json`, "utf-8")
);
const writers = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/__data__/writers.json`, "utf-8")
);
const books = JSON.parse(
    fs.readFileSync(`${process.cwd()}/src/__data__/books.json`, "utf-8")
);
// const reviews = JSON.parse(
//     fs.readFileSync(`${process.cwd()}/src/__data__/reviews.json`, "utf-8")
// );

const importData = async () => {
    try {
        await User.insertMany(users);
        await Writer.insertMany(writers);
        await Book.insertMany(books);

        console.log("Data Import Success".green.inverse);
        process.exit();
    } catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await User.deleteMany({});
        await Writer.deleteMany({});
        await Book.deleteMany({});

        console.log("Data delete...".red.inverse);
        process.exit();
    } catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
