require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const morgan = require("morgan");
const methodOverride = require("method-override");
const authRoutes = require("./controllers/auth");
const session = require("express-session");
const MongoStore = require('connect-mongo')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const applicationController = require('./controllers/applications')
const passMessageToView = require('./middleware/pass-message-to-view')

// Middlewares
require("./db/connection");
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Change this from true to false
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false, // Add this (set to true only if using HTTPS)
        sameSite: 'lax' // Add this
    }
  })
);
app.use(passMessageToView)

// Routes
app.use(passUserToView)

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});
app.use("/auth", authRoutes);

// Routes below this you must be signed in
app.use(isSignedIn);

app.use('/users/:userId/applications', applicationController)

app.listen(PORT, () => {
  console.log("This ship sailing on port", PORT);
});
