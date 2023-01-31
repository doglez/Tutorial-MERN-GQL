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
            const { _id } = args;

            const user = await User.findById(_id);

            if (!user) {
                return new ErrorResponse(
                    `User not found with id ${_id}`,
                    httpStatus["404_NAME"],
                    "_id",
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
            const { _id, name, role, phone } = args;

            let user = await User.findById(_id);

            if (!user) {
                return new ErrorResponse(
                    `User not found with id ${_id}`,
                    httpStatus["404_NAME"],
                    "_id",
                    httpStatus.NOT_FOUND
                );
            }

            user = await User.findByIdAndUpdate(
                _id,
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
            const { _id } = args;

            let user = await User.findById(_id);

            if (!user) {
                return new ErrorResponse(
                    `User not found with id ${_id}`,
                    httpStatus["404_NAME"],
                    "_id",
                    httpStatus.NOT_FOUND
                );
            }

            user = await User.findByIdAndDelete(_id);

            return user;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
};

export default { queries, mutations };
