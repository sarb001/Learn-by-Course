import { createTransport } from 'nodemailer';

export const sendEmail = async(to,subject,text) => {
    const transporter  = createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : false,
        logger: true,
        debug : true,
        ignoreTLS : true,
        secureConnection :false,
        auth : {
            user : process.env.SMTP_USER,
            pass : process.env.SMTP_PASS,
        }
    });

   await transporter.sendMail({
    to,
    subject,
    text,
   });
}