import { createTransport } from 'nodemailer';

export const sendEmail = async(to,subject,text) => {
    const transporter  = createTransport({
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        auth : {
            user : "50751179a03882",
            pass : "6f37c5e9548205",
        },
        debug : true,
    });

   await transporter.sendMail({
    to,
    subject,
    text,
   });
}