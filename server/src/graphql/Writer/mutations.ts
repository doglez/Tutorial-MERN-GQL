const mutations = `#graphql
    type Mutation {
        createWriter(
            name: String!
            born: DateTime!
            died: DateTime!
            nationality: String!
            occupation: [String!]
            works: [String!]
            image_url: String!
            biography: String!
        ): Writer
        updateWriter(
            id: ID!
            name: String
            born: DateTime
            died: DateTime
            nationality: String
            occupation: [String]
            works: [String]
            image_url: String
            biography: String
        ): Writer
        deleteWriter(
            id: ID!
        ): Writer
    },
`;

export default mutations;
