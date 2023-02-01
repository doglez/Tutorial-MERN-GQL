import httpStatus from "http-status";
import ErrorHandler from "../../middleware/ErrorHandler";
import Writer, { IWriter } from "../../models/Writer";
import ErrorResponse from "../../util/ErrorResponse";

const queries = {
    getWriters: async () => {
        try {
            const writers = await Writer.find();

            return writers;
        } catch (error) {
            return ErrorHandler(error);
        }
    },
    showWriter: async (_parent: any, args: IWriter) => {
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
    },
};

const mutations = {
    createWriter: async (_parent: any, args: IWriter) => {
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
    },
    updateWriter: async (_parent: any, args: IWriter) => {
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
    },
    deleteWriter: async (_parent: any, args: IWriter) => {
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
    },
};

export default { queries, mutations };
