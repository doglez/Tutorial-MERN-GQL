import httpStatus from "http-status";
import ErrorHandler from "../../middleware/ErrorHandler";
import User, { IUser } from "../../models/User";
import ErrorResponse from "../../util/ErrorResponse";
import Token from "../../models/Token";

interface IAuth extends IUser {
    passwordConfirm: string;
}

const queries = {
    // getMe: async (_parent: any, args: IUser) => {
    //     try {
    //     } catch (error) {
    //         return ErrorHandler(error);
    //     }
    // },
};

const mutations = {
    signUp: async (_parent: any, args: IAuth) => {
        try {
            const { email, password, passwordConfirm } = args;

            if (password != passwordConfirm) {
                return new ErrorResponse(
                    `Passwords must match`,
                    httpStatus["400_NAME"],
                    "password",
                    httpStatus.BAD_REQUEST
                );
            }

            const user = await User.create({
                name: email,
                email,
                password,
            });

            return TokenResponse(user);
        } catch (error) {
            return ErrorHandler(error);
        }
    },
    signIn: async (_parent: any, args: IUser) => {
        try {
            const { email, password } = args;

            if (!email || !password) {
                return new ErrorResponse(
                    `Please provide an email and password`,
                    httpStatus["400_NAME"],
                    "email, password",
                    httpStatus.BAD_REQUEST
                );
            }

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return new ErrorResponse(
                    `Invalid credentials`,
                    httpStatus["401_NAME"],
                    "email, password",
                    httpStatus.UNAUTHORIZED
                );
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return new ErrorResponse(
                    `Invalid credentials`,
                    httpStatus["401_NAME"],
                    "email, password",
                    httpStatus.UNAUTHORIZED
                );
            }

            return TokenResponse(user);
        } catch (error) {
            return ErrorHandler(error);
        }
    },
    // signOut: async (_parent: any, args: IUser) => {
    //     try {
    //     } catch (error) {
    //         return ErrorHandler(error);
    //     }
    // },
};

/**
 * @name TokenResponse
 * @description Get token to user
 * @param {IUser} user
 * @returns {String} token
 */
const TokenResponse = (user: IUser): string => {
    const token = user.getSignedJwtToken();

    Token.create({
        user: user.id,
        token,
    });

    return token;
};

export default { queries, mutations };
