import httpStatus from "http-status";
import User, { IUser } from "../../models/User";
import ErrorHandler from "../../middleware/ErrorHandler";
import ErrorResponse from "../../util/ErrorResponse";

const queries = {
    getUsers: async () => {
        try {
            const users = await User.find();

            return users;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
    showUser: async (_parent: any, args: IUser) => {
        try {
            const { id } = args;

            const user = await User.findById(id);

            if (!user) {
                return new ErrorResponse(
                    `User not found with id ${id}`,
                    httpStatus["404_NAME"],
                    "id",
                    httpStatus.NOT_FOUND
                );
            }

            return user;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
};

const mutations = {
    createUser: async (_parent: any, args: IUser) => {
        try {
            const { name, email, password } = args;

            const user = await User.create({
                name,
                email,
                password,
            });

            return user;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
    updateUser: async (_parent: any, args: IUser) => {
        try {
            const { id, name, role, phone } = args;

            let user = await User.findById(id);

            if (!user) {
                return new ErrorResponse(
                    `User not found with id ${id}`,
                    httpStatus["404_NAME"],
                    "id",
                    httpStatus.NOT_FOUND
                );
            }

            user = await User.findByIdAndUpdate(
                id,
                {
                    name,
                    role,
                    phone,
                },
                { new: true, runValidators: true }
            );

            return user;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
    deleteUser: async (_parent: any, args: IUser) => {
        try {
            const { id } = args;

            let user = await User.findById(id);

            if (!user) {
                return new ErrorResponse(
                    `User not found with id ${id}`,
                    httpStatus["404_NAME"],
                    "id",
                    httpStatus.NOT_FOUND
                );
            }

            user = await User.findByIdAndDelete(id);

            return user;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
};

export default { queries, mutations };
