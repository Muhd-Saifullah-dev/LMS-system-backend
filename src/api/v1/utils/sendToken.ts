import { COOKIE_EXPIRE } from "../../../config/env.config.ts";
import { IUser } from "@app/model/user.model.ts";
import type { Response } from "express";

export const sendToken = (user: IUser, statusCode: number, message: string, res: Response) => {
    const token = user.generateToken();
    return res
        .status(statusCode)
        .cookie("token", token, {
            expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
        .json({ success: true, user, message, token });
};
