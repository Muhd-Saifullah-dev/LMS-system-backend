import type { Response } from "express";
import { generateVerificationOtpEmailTemplate} from "./emailTemplate/verificationTemplate.ts";
import {sendEmail} from "./sendEmail.ts"
export async function sendVerificationCode(verificationCode: number, email: string, res: Response) {
    try {
        const message = await generateVerificationOtpEmailTemplate(verificationCode);
        sendEmail({
            toEmail:email,
            subject: `Verification Code (Bookworm Library management system)`,
            message,
        });
        res.status(200)
            .json({ success: true, message: "verification code sent successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: `verification code failed to send` });
    }
}
