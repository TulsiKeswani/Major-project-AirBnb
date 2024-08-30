const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const ExpressError = require("./utility/ExpressError");
const {reviewSchema,listingSchema} = require("./schema.js");

module.exports.loggedIn = (req,res,next) => {
    if(!req.isAuthenticated() ){
        req.session.redirectUrl = req.originalUrl ;
        req.flash("error","You're not loggedIn !");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if( req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl ;
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","You're not owner of listing !");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req,res,next) => {
    let {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.curruser._id)){
        req.flash("error","You're not owner of review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateReviewSchema = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
}

module.exports. validateSchema = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
};