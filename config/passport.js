const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../server/models/User");
const bcrypt = require("bcrypt");
// Strategy (options, verify callback)
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        // find user in the table (model)
        const user = await User.findOne({ email: username });
        if (!user) return done(null, false);

        // verify password
        const match = bcrypt.compare(password, user.password);
        if (!match) return done(null, false);
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
// Serialize user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// De-serialize user id
passport.deserializeUser(async (userId, done) => {
  try {
    let user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
