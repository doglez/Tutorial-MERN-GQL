import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { hello } from "./queries";
import { register } from "./mutations";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "The root query type",
    fields: {
        hello,
    },
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root mutation type",
    fields: {
        register,
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

export default schema;
