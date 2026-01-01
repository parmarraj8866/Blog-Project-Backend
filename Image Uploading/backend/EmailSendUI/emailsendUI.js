function EmailSendUI(otp) {
  return `
  <div style="width:100%;padding:40px 0;background:#eef1f6;font-family:Arial,sans-serif;">
    <div style="max-width:420px;margin:auto;background:#ffffff;border-radius:14px;
                box-shadow:0 12px 30px rgba(0,0,0,0.15);text-align:center;overflow:hidden;">
      
      <div style="background:#4a6cf7;color:#ffffff;padding:22px;
                  font-size:18px;font-weight:bold;">
        Forgot Password
      </div>

      <div style="padding:26px;">
        <p style="margin:0 0 16px;font-size:14px;color:#555;">
          Use the OTP below to reset your password
        </p>

        <div style="margin:20px auto;display:inline-block;
                    background:#f4f6ff;border-radius:12px;
                    padding:16px 32px;font-size:30px;
                    font-weight:bold;letter-spacing:6px;
                    color:#4a6cf7;border:1px solid #e0e5ff;">
          ${otp}
        </div>

      </div>
    </div>
  </div>
  `;
}

module.exports = EmailSendUI;
