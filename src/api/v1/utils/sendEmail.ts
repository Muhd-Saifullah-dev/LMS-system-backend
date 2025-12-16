import nodemailer from "nodemailer";
import {EMAIL,PASSWORD } from "@config/env.config.ts"

type sendEmailOption ={
    toEmail:string,
    subject:string,
    message:string
}

export async function sendEmail({toEmail,subject,message}:sendEmailOption):Promise<boolean> {
const transport=nodemailer.createTransport({
    service:"gmail",
    secure:false,
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:EMAIL,
        pass:PASSWORD
    }
})
const mailoption={
    from:EMAIL,
    to:toEmail,
    subject:subject,
    html:message
}
try {
    await transport.sendMail(mailoption)
    transport.close()
    return true
} catch (error) {
    return false
}
    
}