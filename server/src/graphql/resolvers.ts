import User from "./User";

const resolvers = {
    Query: {
        ...User.resolvers.queries,
    },
    Mutation: {
        ...User.resolvers.mutations,
    },
};

export default resolvers;
