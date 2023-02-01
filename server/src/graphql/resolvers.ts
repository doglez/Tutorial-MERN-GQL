import Auth from "./Auth";
import User from "./User";
import Writer from "./Writer";
import { dateScalar } from "./scalars";

const resolvers = {
    DateTime: dateScalar,
    Query: {
        ...User.resolvers.queries,
        ...Auth.resolvers.queries,
        ...Writer.resolvers.queries,
    },

    Mutation: {
        ...User.resolvers.mutations,
        ...Auth.resolvers.mutations,
        ...Writer.resolvers.mutations,
    },
};

export default resolvers;
