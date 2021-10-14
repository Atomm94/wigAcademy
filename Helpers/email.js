import mailer from 'nodemailer';
import * as config from '../config';


const send = async (to, subject, msg) => {
    new Promise(async (res, rej) => {

        let transporter = mailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "ilovecoding777@gmail.com",
                pass: "webprojects"
            }
        });

        let mailOptions = {
            from: process.env.SUPER_ADMIN_EMAIL,
            to: to,
            subject: subject,
            html:
                '<div>' +
                '<div style="text-align: center; font-size:1.2rem">Hello from Wig Academy</div>' +
                '<div style="text-align: center; font-size:1.2rem; margin-top:10px">' + subject + '</div>' +
                '<div style="text-align: center; font-size:1.5rem;color: #ff0000; margin-top:10px">' + msg + '</div>' +
                '</div>',
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
    return subject;
}


const invite = async (from, to, tokUrl) => {
    new Promise((res, rej) => {
        let transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: "ilovecoding777@gmail.com",
                pass: "webprojects"
            }
        });

        let mailOptions = {
            from: from,
            to: to,
            subject: 'Email Verification',
            html:
                '<div>' +
                '<div style="text-align: center; font-size:1.2rem">Hi dear user</div>' +
                `<div style="text-align: center; font-size:1.2rem">${from} invite you</div>` +
                '<div style="text-align: center; font-size:1.2rem; margin-top:10px">Your register link</div>' +
                '<div style="text-align: center; font-size:1.5rem;color: #ff0000; margin-top:10px">' + tokUrl + '</div>' +
                '</div>',
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
}


export {
    send,
    invite
};



