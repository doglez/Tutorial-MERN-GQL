import User from "./User";

const typeDefs = `#graphql
    scalar DateTime

    ${User.types}    

    ${User.queries}

    ${User.mutations}
`;

export default typeDefs;
