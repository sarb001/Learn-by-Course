import { createTransport } from 'nodemailer';

// export const sendEmail = async(to,subject,text) => {
//     const transporter  = createTransport({
//         host : "smtp.gmail.com",
//         port : 465,
//         secure : true,
//         auth : {
//             user : "sarbbsandhu55@gmail.com",
//             pass : "phbbxsizbrfpvzbk",
//         },
//         debug : true,
//     });

//    await transporter.sendMail({
//     to,
//     subject,
//     text,
//    });
// }