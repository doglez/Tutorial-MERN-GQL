import User from "../../models/User";

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
        const { email, password } = args;

        const user = await User.create({
            name: email,
            email,
            password,
        });

        return user;
    },
};

export default { queries, mutations };
