if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

module.exports = process.env.MAP_TOKEN;
const dbUrl = process.env.ATLASDB_URL;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utility/ExpressError");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
app.engine('ejs',ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.use("/aspects",express.static(path.join(__dirname,"/aspects")));

main()
.then(() =>{
    console.log("connection built");
})
 .catch ((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create(
    {
        mongoUrl: dbUrl,
        crypto: {
            secret:  process.env.SECRET,
          },
        touchAfter: 24*60*60 // See below for details
      }
);

const sessionOptions = {
    store : store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}


app.use(session(sessionOptions));
app.use(passport.session());
app.use(flash());
app.use(passport.initialize()); 

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// root route

app.get("/",(req,res)=>{
    res.redirect("/listings");
});


app.use((req,res,next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);


app.all("*",(req,res,next) =>{
    next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next) =>{
    let {status =500, message = "Something went wrong!"} = err ;
    res.status(status).render("listings/error.ejs",{message});
});

app.listen(8080,() =>{
    console.log("APP start listening on 8080");
});