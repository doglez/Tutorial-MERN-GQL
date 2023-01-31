const queries = `#graphql
   type Query {
        getUsers: [User]
        showUser(id:ID!): User
    }
`;

export default queries;
