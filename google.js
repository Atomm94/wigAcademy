const express = require('express');
require('dotenv').config();
const querystring = require('querystring');
const path = require('path');
const app = express();

const redirectURI = "/auth/google";

function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `http://localhost:4000${redirectURI}`,
        client_id: '648273977408-pglbo43tjof4sgi362fjhl4tuec36nkd.apps.googleusercontent.com',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    }

    return `${rootUrl}?${querystring.stringify(options)}`;
}

app.get('/auth/google/url', (req, res) => {
    return res.send(getGoogleAuthURL());
})

app.get(redirectURI, (req, res) => {
    res.sendFile(path.join(__dirname, 'google.html'));
})

app.listen(4000, () => {
    console.log('Server started on port 4000');
})