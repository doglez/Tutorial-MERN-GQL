import { NODE_ENV } from "../config/Config";
import ErrorResponse from "../util/ErrorResponse";
import httpStatus from "http-status";

/**
 * @name ErrorHandler
 * @description Middleware that handle the error from the Data Base data
 * @param {any} err
 * @returns {Object} error
 */
const ErrorHandler = (err: any): object => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    if (NODE_ENV === "development") {
        console.error(err);
    }

    let message: any;
    switch (err.name) {
        case "CastError":
            // Mongoose bad ObjectID
            message = "Resource not found";
            return new ErrorResponse(
                message,
                httpStatus["404_NAME"],
                err.path,
                httpStatus.NOT_FOUND
            );

        case "MongoServerError":
            // Mongoose duplicate Key
            message = `Duplicate value ${Object.values(err.keyValue)}`;
            return new ErrorResponse(
                message,
                httpStatus["400_NAME"],
                Object.keys(err.keyPattern)[0],
                httpStatus.BAD_REQUEST
            );

        case "ValidationError":
            // Mongoose validation error
            message = Object.values(err.errors).map(
                (value: any) => value.message
            );
            const argumentName = Object.values(err.errors).map(
                (value: any) => value.path
            );
            return new ErrorResponse(
                message,
                httpStatus["400_NAME"],
                argumentName[0],
                httpStatus.BAD_REQUEST
            );

        default:
            return new ErrorResponse(
                httpStatus[500],
                httpStatus["500_NAME"],
                "N/A",
                httpStatus.INTERNAL_SERVER_ERROR
            );
    }
};

export default ErrorHandler;
