const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createReview = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    console.log(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","Review Succefully Added!");
    res.redirect(`/listings/${listing.id}`);

};

module.exports.destroyReview = async (req,res) =>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull : {review : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Succefully Deleted!");
    res.redirect(`/listings/${id}`)
};