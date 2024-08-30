const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utility/wrapAsync");
const Review = require("../models/reviews.js");
const {validateReviewSchema,loggedIn,isReviewAuthor} = require("../middlewear.js");
const reviewControllers = require("../controllers/reviews.js");


// add review route

router.post("/",
    loggedIn,
    validateReviewSchema, 
    wrapAsync(reviewControllers.createReview)
);

// delte review

router.delete(
    "/:reviewId", 
    loggedIn,
    isReviewAuthor,
    wrapAsync(reviewControllers.destroyReview)
);
module.exports = router;