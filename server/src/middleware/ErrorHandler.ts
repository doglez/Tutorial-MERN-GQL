import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config/Config";
import { consoleErr } from "../debugger/debugger";
import ErrorResponse from "../util/ErrorResponse";
import httpStatus from "http-status";

/**
 * @name ErrorHandler
 * @description Handle the errors from the Data Base data
 * @param {any} err
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} _next
 * @returns {Object} error
 */
const ErrorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): object => {
    let error = { ...err };

    if (NODE_ENV === "development") {
        consoleErr(err);
    }

    let message: any;
    switch (err.name) {
        case "CastError":
            // Mongoose bad ObjectID
            message = "Resource not found";
            error = new ErrorResponse(message, httpStatus.NOT_FOUND);
            break;

        case "MongoServerError":
            // Mongoose duplicate Key
            message = `Duplicate value ${Object.values(err.keyValue)}`;
            error = new ErrorResponse(message, httpStatus.NOT_FOUND);
            break;

        case "ValidationError":
            // Mongoose validation error
            message = Object.values(err.errors).map(
                (value: any) => value.message
            );
            error = new ErrorResponse(message, httpStatus.NOT_FOUND);
            break;

        default:
            break;
    }

    return res.status(err.StatusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        error: error.message || httpStatus["500_MESSAGE"],
    });
};

export default ErrorHandler;
