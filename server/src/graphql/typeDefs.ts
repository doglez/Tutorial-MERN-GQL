import Auth from "./Auth";
import User from "./User";
import Writer from "./Writer";

const typeDefs = `#graphql
    scalar DateTime

    ${User.types}
    ${Auth.types}
    ${Writer.types}

    ${User.queries}
    ${Auth.queries}
    ${Writer.queries}

    ${User.mutations}
    ${Auth.mutations}
    ${Writer.mutations}
`;

export default typeDefs;
