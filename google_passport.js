// import userModel from "./Models/User";
//
// const express = require('express');
// require('dotenv').config();
// const app = express();
// const passport = require('passport');
//
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
//
// passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:4000/auth/google",
//         passReqToCallback: true
//     },
//     function(request, accessToken, refreshToken, profile, done) {
//         userModel.create({ googleId: profile.id }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));
//
// app.listen(4000, () => {
//     console.log('Server started on port 4000');
// })