const queries = `#graphql
   type Query {
      getWriters:[Writer]
      showWriter(id: ID): Writer
   },
`;

export default queries;
