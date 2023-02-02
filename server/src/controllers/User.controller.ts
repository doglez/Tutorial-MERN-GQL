import httpStatus from "http-status";
import ErrorHandler from "../middleware/ErrorHandler";
import User, { IUser } from "../models/User";
import ErrorResponse from "../util/ErrorResponse";
import { Response } from "express";

/**
 * @name getUsers
 * @description Get a list of users
 * @access Private
 * @returns {Promise<object>} users
 */
export const getUsers = async (): Promise<object> => {
    try {
        const users = await User.find();

        return users;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name showUser
 * @description Show user info
 * @access Private
 * @param {Any} _parent
 * @param {IUser} args
 * @param {Response} contextValue
 * @returns {Promise<object>} user
 */
export const showUser = async (
    _parent: any,
    args: IUser,
    contextValue: Response
): Promise<object> => {
    try {
        const { id } = args;
        console.log(contextValue);

        const user = await User.findById(id);

        if (!user) {
            return new ErrorResponse(
                `User not found with id ${id}`,
                httpStatus["404_NAME"],
                "id",
                httpStatus.NOT_FOUND
            );
        }

        return user;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name createUser
 * @description Create a User
 * @access Private
 * @param {Any} _parent
 * @param {IUser} args
 * @returns {Promise<object>} user
 */
export const createUser = async (
    _parent: any,
    args: IUser
): Promise<object> => {
    try {
        const { name, email, password } = args;

        const user = await User.create({
            name,
            email,
            password,
        });

        return user;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name updateUser
 * @description Update User info
 * @access Private
 * @param {Any} _parent
 * @param {IUser} args
 * @returns {Promise<object | null>} user
 */
export const updateUser = async (
    _parent: any,
    args: IUser
): Promise<object | null> => {
    try {
        const { id, name, role, phone } = args;

        let user = await User.findById(id);

        if (!user) {
            return new ErrorResponse(
                `User not found with id ${id}`,
                httpStatus["404_NAME"],
                "id",
                httpStatus.NOT_FOUND
            );
        }

        user = await User.findByIdAndUpdate(
            id,
            {
                name,
                role,
                phone,
            },
            { new: true, runValidators: true }
        );

        return user;
    } catch (error) {
        return ErrorHandler(error);
    }
};

/**
 * @name deleteUser
 * @description Delete a user
 * @access Private
 * @param {Any} _parent
 * @param {IUser} args
 * @returns {Promise<object | null>} user
 */
export const deleteUser = async (
    _parent: any,
    args: IUser
): Promise<object | null> => {
    try {
        const { id } = args;

        let user = await User.findById(id);

        if (!user) {
            return new ErrorResponse(
                `User not found with id ${id}`,
                httpStatus["404_NAME"],
                "id",
                httpStatus.NOT_FOUND
            );
        }

        user = await User.findByIdAndDelete(id);

        return user;
    } catch (error) {
        return ErrorHandler(error);
    }
};
