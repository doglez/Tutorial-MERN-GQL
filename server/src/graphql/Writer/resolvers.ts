import {
    createWriter,
    deleteWriter,
    getWriters,
    showWriter,
    updateWriter,
} from "../../controllers/Writer.controller";

const queries = {
    getWriters,
    showWriter,
};

const mutations = {
    createWriter,
    updateWriter,
    deleteWriter,
};

export default { queries, mutations };
