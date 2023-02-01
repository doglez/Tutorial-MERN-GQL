const mutations = `#graphql
    type Mutation {
        signUp(
            email: String!,
            password: String!,
            passwordConfirm: String!,
        ): String
        signIn(
            email: String!,
            password: String!,
        ): String
    }
`;

export default mutations;
