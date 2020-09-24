# How passport-local work together with express-session

_(local did not need to use session; to disable the use of `session` you need to define it in the configuration)_

---

## With every HTTP request:

1. `express-session` is going to attach a session object to the request object, as `req.session`, with a `cookie` property

When you post to `/login` to login, `passport` will implement the strategy you defined to authenticate the user, and set `req.session.passport.user` to the `user` object we retrieved from the database

When you visit a **Protected Route** i.e. `/dashboard`, it will check if `passport.isAuthenticated` returns `true` or `false`. `passport.isAuthenticated` will check to see if `req.session.passport.user` is `null` or not, if it is `null`, it means the user us not authenticated, if it is not `null`, it means the user has been authenticated. If it returns true, it will send along the resource, if not, no.

---

## Serialize and De-Serialize User:

In a typical web application, the credential used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.
In order to support login session, Passport will serialize and deserialize user instances to and frm the session.

**serializeUser** will attaches `user.id` under `req.session.passport`
**deserializeUser** will use that `id` stored in `req.session.passport.user` and query the database to retrieve the user document

**The `session` object is stored in the session store, which means the `passport object` is also stored in the `session store`**

---
