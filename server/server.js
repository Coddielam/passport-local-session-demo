const config = require("config");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const app = express();

connectDB();

// Body parser
app.use(express.json());

// Mongo Session Store
app.use(
  session({
    secret: config.get("sessionSecret"),
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
    },
  })
);

// requiring the passport config
require("../config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server up on port ${PORT}...`));
