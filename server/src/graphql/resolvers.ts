import User from "./User";
import Writer from "./Writer";
import { dateScalar } from "./scalars";

const resolvers = {
    DateTime: dateScalar,
    Query: {
        ...User.resolvers.queries,
        ...Writer.resolvers.queries,
    },

    Mutation: {
        ...User.resolvers.mutations,
        ...Writer.resolvers.mutations,
    },
};

export default resolvers;
