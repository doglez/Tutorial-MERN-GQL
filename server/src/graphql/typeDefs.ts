import User from "./User";

const typeDefs = `#graphql
  ${User.types}

  type Query {
    ${User.queries}
  }

  type Mutation {
    ${User.mutations}
  }
`;

export default typeDefs;
