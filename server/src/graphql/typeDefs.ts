import User from "./User";
import Writer from "./Writer";

const typeDefs = `#graphql
    scalar DateTime

    ${User.types}
    ${Writer.types}

    ${User.queries}
    ${Writer.queries}

    ${User.mutations}
    ${Writer.mutations}
`;

export default typeDefs;
