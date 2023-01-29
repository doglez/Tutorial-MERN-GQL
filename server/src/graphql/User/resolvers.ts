import User from "../../models/User";
import httpStatus from "http-status";
import ErrorResponse from "../../util/ErrorResponse";

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
        const { name, email, password } = args;

        const user = await User.create({
            name,
            email,
            password,
        });

        return user;
    },
    updateUser: async (_parent: any, args: IArgs) => {
        const { id, name, role, phone } = args;

        let user = await User.findById(id);

        if (!user) {
            throw new ErrorResponse(
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
    },
};

export default { queries, mutations };
