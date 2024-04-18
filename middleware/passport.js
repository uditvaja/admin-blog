    const LocalStrategy = require('passport-local').Strategy;
    const bcrypt = require('bcrypt');
    const AdminModel = require('../models/admin-model'); 

    module.exports = function(passport) {
        passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const admin = await AdminModel.findOne({ email });
                if (!admin) {
                    return done(null, false, { message: 'Incorrect email.' });
                }

                const isMatch = await bcrypt.compare(password, admin.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, admin);
            } catch (error) {
                return done(error);
            }
        }));
        passport.serializeUser((admin, done) => {
            done(null, admin.id);
        });
        
        passport.deserializeUser(async (id, done) => {
            try {
                const admin = await AdminModel.findById(id);
                done(null, admin);
            } catch (error) {
                done(error);
            }
        });
        
    };
 