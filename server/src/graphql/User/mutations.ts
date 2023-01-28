const mutations = `#graphql
    createUser(
        name: String!,
        email: String!,
        role: String!,
        phone: String!,
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
`;

export default mutations;
