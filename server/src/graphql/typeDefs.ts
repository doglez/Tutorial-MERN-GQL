const typeDefs = `#graphql
    scalar DateTime

    type User {
        id: ID
        name: String
        email: String
        role: String
        phone: String
    }

    type Writer {
        id: ID
        name: String
        born: DateTime
        died: DateTime
        nationality: String
        occupation: [String]
        works: [String]
        image_url: String
        biography: String
    }

    type Query {
        getUsers: [User]
        showUser(id:ID!): User
        getWriters: [Writer]
        showWriter(id: ID): Writer
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
