import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // 1. Create a transporter (the mail delivery service)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // 2. Define the email options
    const mailOptions = {
        from: '"VideoTube Support" <support@videotube.com>', // Sender address
        to: options.email,                                   // Recipient address
        subject: options.subject,                            // Subject line
        text: options.message,                               // Plain text body
        html: options.html,                                  // Optional: HTML body
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);
};

export { sendEmail };