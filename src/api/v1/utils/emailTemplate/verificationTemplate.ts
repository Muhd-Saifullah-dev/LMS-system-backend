export async function generateVerificationOtpEmailTemplate(otp:number):Promise<string>{
    return`
  <html>
    <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, sans-serif;">
      <div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:8px;overflow:hidden;">
        
        <div style="background:#4f46e5;padding:20px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:26px;">
            Your OTP Code
          </h1>
        </div>

        <div style="padding:30px;color:#374151;">
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) for account verification is:</p>

          <div style="background:#f3f4f6;padding:15px;border-radius:6px;text-align:center;margin:20px 0;">
            <span style="font-size:32px;font-weight:bold;color:#4f46e5;">
              ${otp}
            </span>
          </div>

          <p>This OTP is valid for <b>2 minutes</b>. Please do not share it with anyone.</p>
          <p>If you did not request this code, please ignore this email.</p>

          <p style="margin-top:30px;">Thank you,<br/>Your Company Team</p>
        </div>

        <div style="background:#f3f4f6;text-align:center;padding:12px;font-size:12px;color:#6b7280;">
          © 2024 Your Company. All rights reserved.
        </div>

      </div>
    </body>
  </html>
  `;
    
}