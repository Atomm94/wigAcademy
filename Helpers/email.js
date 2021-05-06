import mailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import smsCode from 'generate-sms-verification-code';
import config from '../config';

const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_ID, "https://developers.google.com/oauthplayground");

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


const send_mail = mailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: oauth2Client.getAccessTokenAsync
    }
});

const send = async (to, type) => {
    const generatedCode = smsCode(6, {type: 'string'})
    new Promise((res, rej) => {
        send_mail.sendMail({
            from: process.env.EMAIL,
            to: to,
            html:
                '<div>' +
                '<div style="text-align: center; font-size:1.2rem">Hi dear user</div>' +
                '<div style="text-align: center; font-size:1.2rem; margin-top:10px">Your confirmation code</div>' +
                '<div style="text-align: center; font-size:1.5rem;color: #ff0000; margin-top:10px">' + generatedCode + '</div>' +
                '</div>',
            subject: 'Email Verification',
            generateTextFromHTML: false
        }, function (err, info) {
            if (err) {
                console.log(err);
                res(false);
            }
            if (info) {
                send_mail.close();
                res(true);
            }
        })
    })
    return generatedCode;
}


const invite = async (from, to, tokUrl) => {
    new Promise((res, rej) => {
        send_mail.sendMail({
            from: process.env.EMAIL,
            to: to,
            html:
                '<div>' +
                '<div style="text-align: center; font-size:1.2rem">Hi dear user</div>' +
                `<div style="text-align: center; font-size:1.2rem">${from} invite you</div>` +
                '<div style="text-align: center; font-size:1.2rem; margin-top:10px">Your register link</div>' +
                '<div style="text-align: center; font-size:1.5rem;color: #ff0000; margin-top:10px">' + tokUrl + '</div>' +
                '</div>',
            subject: 'Email Verification',
            generateTextFromHTML: false
        }, function (err, info) {
            if (err) {
                console.log(err);
                res(false);
            }
            if (info) {
                send_mail.close();
                res(true);
            }
        })
    })
}

export {
    send,
    invite
};


