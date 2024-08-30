const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewear.js");
const userControllers = require("../controllers/users.js");

router.get("/signup",userControllers.renderSignupForm);

router.post("/signup",wrapAsync(userControllers.signup));

router.get("/login",userControllers.renderLoginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        {
            failureRedirect :  "/login",
            failureFlash : true,
        }),
        userControllers.login
   );

router.get("/logout",userControllers.logout);

module.exports = router ;


