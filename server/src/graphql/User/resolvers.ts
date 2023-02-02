import {
    createUser,
    deleteUser,
    getUsers,
    showUser,
    updateUser,
} from "../../controllers/User.controller";

const queries = {
    getUsers,
    showUser,
};

const mutations = {
    createUser,
    updateUser,
    deleteUser,
};

export default { queries, mutations };
