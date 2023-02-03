import httpStatus from "http-status";
import ErrorHandler from "../middleware/ErrorHandler";
import Writer, { IWriter } from "../models/Writer";
import ErrorResponse from "../util/ErrorResponse";

/**
 * @name getWriters
 * @description Get a list of writers
 * @access Public
 * @returns {Promise<object>} writer
 */
export const getWriters = async (): Promise<object> => {
    try {
        const writers = await Writer.find();

        return writers;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name showWriter
 * @description Show writer info
 * @access Public
 * @param {Any} _parent
 * @param {IWriter} args
 * @returns {Promise<object>} writer
 */
export const showWriter = async (
    _parent: any,
    args: IWriter
): Promise<object> => {
    try {
        const { id } = args;

        const writer = await Writer.findById(id);

        if (!writer) {
            return new ErrorResponse(
                `Writer not found with id ${id}`,
                httpStatus["404_NAME"],
                "id",
                httpStatus.NOT_FOUND
            );
        }

        return writer;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name createWriter
 * @description Create a writer
 * @access Private
 * @param {Any} _parent
 * @param {IWriter} args
 * @returns {Promise<object>} writer
 */
export const createWriter = async (
    _parent: any,
    args: IWriter
): Promise<object> => {
    try {
        const {
            name,
            born,
            died,
            nationality,
            occupation,
            works,
            image_url,
            biography,
        } = args;

        const writer = await Writer.create({
            name,
            born,
            died,
            nationality,
            occupation,
            works,
            image_url,
            biography,
        });

        return writer;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name updateWriter
 * @description Update Writer info
 * @access Private
 * @param {Any} _parent
 * @param {IWriter} args
 * @returns {Promise<object | null>} writer
 */
export const updateWriter = async (
    _parent: any,
    args: IWriter
): Promise<object | null> => {
    try {
        const {
            id,
            name,
            born,
            died,
            nationality,
            occupation,
            works,
            image_url,
            biography,
        } = args;

        let writer = await Writer.findById(id);

        if (!writer) {
            return new ErrorResponse(
                `Writer not found with id ${id}`,
                httpStatus["404_NAME"],
                "id",
                httpStatus.NOT_FOUND
            );
        }

        writer = await Writer.findByIdAndUpdate(
            id,
            {
                name,
                born,
                died,
                nationality,
                occupation,
                works,
                image_url,
                biography,
            },
            { new: true, runValidators: true }
        );

        return writer;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name deleteWriter
 * @description Delete a writer
 * @access Private
 * @param {Any} _parent
 * @param {IWriter} args
 * @returns {Promise<object | null>} writer
 */
export const deleteWriter = async (
    _parent: any,
    args: IWriter
): Promise<object | null> => {
    try {
        const { id } = args;

        let writer = await Writer.findById(id);

        if (!writer) {
            return new ErrorResponse(
                `Writer not found with id ${id}`,
                httpStatus["404_NAME"],
                "id",
                httpStatus.NOT_FOUND
            );
        }

        writer = await Writer.findByIdAndDelete(id);

        return writer;
    } catch (error) {
        return ErrorHandler(error);
    }
};
