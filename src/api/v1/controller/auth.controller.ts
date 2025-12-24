import type { Request, Response, NextFunction } from "express";
import Responses from "../../../constant/responses.ts";
import User from "../model/user.model.ts";
import bcrypt from "bcrypt";
import { sendVerificationCode } from "../utils/sendVerificationCode.ts";
import { sendToken } from "@app/utils/sendToken.ts";
const responses = new Responses();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json(responses.generic_response(401, false, null, "all field are required"));
        }
        const isRegister = await User.find({ email, accountVerified: true });
        if (isRegister.length > 0) {
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

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;

        // 1️⃣ Validation
        if (!email || !otp) {
            return res.json(responses.bad_request_error("email and otp is missing", null));
        }

        // 2️⃣ Find all unverified users with same email
        const userAllEntries = await User.find({
            email,
            accountVerified: false,
        }).sort({ createdAt: -1 });

        if (userAllEntries.length === 0) {
            return res.json(responses.bad_request_error("user not found", null));
        }

        // 3️⃣ Keep latest entry only
        const user = userAllEntries[0];

        if (userAllEntries.length > 1) {
            await User.deleteMany({
                _id: { $ne: user._id },
                email,
                accountVerified: false,
            });
        }

        // 4️⃣ OTP match
        if (user.verificationCode !== Number(otp)) {
            return res.json(responses.bad_request_error("otp is invalid", null));
        }

        if (!user.verificationCodeExpire) {
            return res.json(responses.bad_request_error("otp expired or invalid", null));
        }

        // 5️⃣ OTP expiry
        const currentTime = Date.now();
        const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

        if (currentTime > verificationCodeExpire) {
            return res.json(responses.bad_request_error("otp is expired", null));
        }

        user.accountVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpire = undefined;

        await user.save({ validateModifiedOnly: true });

        sendToken(user, 200, "Account Verified", res);
    } catch (error) {
        console.log(`error in verify otp :: ${error}`);
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json(responses.bad_request_error("email and password is incorrect", null));
        }
        const user = await User.findOne({ email, accountVerified: true }).select("+password");
        if (!user) {
            return res.json(responses.bad_request_error("Invalid crediential"));
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.json(responses.bad_request_error("Invalid password"));
        }
        sendToken(user, 200, "User logged in successfully", res);
    } catch (error) {
        console.log(`error in login :: ${error}`);
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        return res.json(responses.ok_response(null, "user loggout successfully"));
    } catch (error) {
        console.log(`error in logout :: ${error}`);
        next(error);
    }
};
