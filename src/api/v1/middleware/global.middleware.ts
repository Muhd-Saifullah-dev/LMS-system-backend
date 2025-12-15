import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import Responses from "../../../constant/responses.ts";
const responses = new Responses();

const globalMiddleware: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const message = err.message ?? "something went wrong";
    const status = err.status ?? 500;
    if (err.code === 11000) {
        return res.json(responses.not_found_error("duplicate key error"));
    }
    return res.json(responses.generic_response(status, false, null, message));
};

export default globalMiddleware;
