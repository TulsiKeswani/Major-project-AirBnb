const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res) => {
    try {
        let {email,username,password} = req.body;
        const newUser = new User({
        email : email,
        username : username,
    });

    let result = await User.register(newUser,password);
    console.log(result);
    req.login(result,(err)=> {
        if(err) {
           return next(err);
        } 
        req.flash("success","Welcome to Woderlust!"); 
         res.redirect("/listings");
    });
    
} 
catch (error) {
       req.flash("error",error.message); 
       res.redirect("/signup");
    }
    
};


module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login =  async (req,res) => {
    req.flash("success","Welcome again to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err){
           return next(err);
        } 
        req.flash("success","logout Successfully");
        res.redirect("/listings");
    })
};