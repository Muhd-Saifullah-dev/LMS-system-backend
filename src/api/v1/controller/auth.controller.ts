import type { Request, Response, NextFunction } from "express";
import Responses from "../../../constant/responses.ts";
import User from "../model/user.model.ts";
import bcrypt from "bcrypt";
import { sendVerificationCode } from "../utils/sendVerificationCode.ts";

const responses = new Responses();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json(responses.generic_response(401, false, null, "all field are required"));
        }
        const isRegister = await User.find({ email, accountVerified: true });
        if (isRegister) {
            return res.json(responses.bad_request_error("user is already exist", null));
        }
        const registerationAttemptByUser = await User.find({
            email,
            accountVerified: false,
        });
        if (registerationAttemptByUser.length >= 5) {
            return res.json(responses.bad_request_error("you have exceed the attempt user", null));
        }
        if (password.length < 8 || password.length > 16) {
            return res.json(
                responses.bad_request_error("password must be between 8 and 16 character", null),
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const verificationCode = await user.generateVerificationCode();
        await sendVerificationCode(verificationCode, user.email, res);
        await user.save();
    } catch (error: any) {
        console.log(`error in register :: ${error}`);
        next(error);
    }
};


