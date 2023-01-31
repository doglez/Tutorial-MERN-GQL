import User from "./User";
import { dateScalar } from "./scalars";

const resolvers = {
    DateTime: dateScalar,
    Query: {
        ...User.resolvers.queries,
    },

    Mutation: {
        ...User.resolvers.mutations,
    },
};

export default resolvers;
