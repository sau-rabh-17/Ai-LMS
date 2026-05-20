import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth:{
        user:process.env.UserEmail,
        pass:process.env.UserPass,
    },
});

const sendMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.UserEmail,
        to: to,
        subject: "Reset your password",
        html :`<p> Your otp for password reset is <b>${otp} </b>.<br>
        otp expires in 5 minutes`,
    });
}

export default sendMail;