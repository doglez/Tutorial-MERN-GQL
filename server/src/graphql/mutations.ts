import { GraphQLString } from "graphql";
import User, { IUser } from "../models/User";
import { JWT_EXPIRE, JWT_SECRET } from "../config/Config";
import jwt from "jsonwebtoken";

export const register = {
    type: GraphQLString,
    description: "Register a new user and return a token",
    args: {
        username: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        displayName: {
            type: GraphQLString,
        },
    },
    resolve: async (_source: any, args: any) => {
        const user = await User.create(args);

        const token = CreateJWT(user);

        return token;
    },
};

/**
 * @name CreateJWT
 * @description Get token from model
 * @param {IUser} user
 * @returns Signed JWT
 */
const CreateJWT = (user: IUser) => {
    return jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
        algorithm: "HS512",
    });
};
