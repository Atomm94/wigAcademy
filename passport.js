import userModel from "./Models/User";

require('dotenv').config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
    JWT_SECRET_KEY,
} = process.env;

const Passport = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });

    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const existingUser = await userModel.findOne({ googleId: profile.id });

                    if (existingUser) {
                        return done(null, existingUser);
                    }

                    const newUser = new userModel({
                        googleId: profile.id,
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        email: profile.emails[0].value,
                        login_method: "google",
                    });
                    await newUser.save();

                    return done(null, newUser);
                } catch (e) {
                    return done(e, false);
                }
            }
        )
    );

    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: JWT_SECRET_KEY,
            },
            async (payload, done) => {
                try {
                    const user = await userModel.findById(payload.sub, { password: 0 });
                    if (user) {
                        return done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (err) {
                    done(err, false);
                }
            }
        )
    );
};


export default Passport;