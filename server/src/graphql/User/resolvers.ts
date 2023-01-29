import User from "../../models/User";
import httpStatus from "http-status";
import ErrorResponse from "../../util/ErrorResponse";
import ErrorHandler from "../../middleware/ErrorHandler";

interface IArgs {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    password: string;
}

const queries = {
    getUsers: async () => {
        const users = await User.find();

        return users;
    },
    showUser: async (_parent: any, args: IArgs) => {
        const users = await User.findById(args.id);

        return users;
    },
};

const mutations = {
    createUser: async (_parent: any, args: IArgs) => {
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
    updateUser: async (_parent: any, args: IArgs) => {
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
    deleteUser: async (_parent: any, args: IArgs) => {
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
