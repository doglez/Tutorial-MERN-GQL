const typeDefs = `#graphql
    type User {
        id: ID,
        name: String,
        email: String,
        role: String,
        phone: String,
    }

    type Query {
        getUsers: [User],
        showUser(id:ID!): User
    }

    type Mutation {
        createUser(
            name: String!,
            email: String!,
            role: String,
            phone: String,
            password: String!,
        ): User
        updateUser(
            id: ID!,
            name: String,
            role: String,
            phone: String,
        ): User
        deleteUser(
            id: ID!,
        ): User
    }
`;

export default typeDefs;
