import { GraphQLError } from "graphql";

class ErrorResponse extends GraphQLError {
    constructor(
        message: string,
        codeMessage: string,
        argumentName: string,
        statusCode: number
    ) {
        super(message, {
            extensions: {
                code: codeMessage,
                argumentName,
                http: {
                    status: statusCode,
                },
            },
        });
    }
}

export default ErrorResponse;
