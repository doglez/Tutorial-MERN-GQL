import { GraphQLString } from "graphql";

export const hello = {
    type: GraphQLString,
    description: "Return a string",
    resolve: () => "Hello world",
};
