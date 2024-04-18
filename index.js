const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 4000;
const route = require('./routes/route');
const db = require('./config/db');

require('./middleware/passport')(passport);

app.use(express.static('public'));
app.use(express.static('upload'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,   
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', route);
app.listen(port, () => {
    console.log("server start....");
});
app.get('/debug', (req, res) => {
    res.json(req.session);
});
