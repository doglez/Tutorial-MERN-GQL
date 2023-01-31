import { GraphQLScalarType, Kind } from "graphql";

export const dateScalar = new GraphQLScalarType({
    name: "DateTime",
    description: "A date and time, represented as an ISO-8601 string",
    serialize(value: any) {
        return value.toISOString(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: any) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});
