import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { hello } from "./queries";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        hello,
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
});

export default schema;
