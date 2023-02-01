const types = `#graphql
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
    },
`;

export default types;
