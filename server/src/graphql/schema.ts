const typeDefs = `#graphql
  type Book {
    id: ID,
    title: String,
    year: Int
  }

  type Query {
    hello(name: String): String
    books: [Book]
    book(id: ID!, title: String, year: Int): Book
  }

  type Mutation {
    create(title:String!, year: Int!): Book
    update(id: ID!, title:String, year: Int): Book
    delete(id: ID!): Book
  }
`;

export default typeDefs;
