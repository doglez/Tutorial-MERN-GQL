import { GraphQLError } from "graphql";

/**
 * @name ErrorResponse
 * @description Class that build a message with status code and argument name
 * @param {string} message
 * @param {string} codeMessage
 * @param {string} argumentName
 * @param {number} statusCode
 * @returns {object} error
 */
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
