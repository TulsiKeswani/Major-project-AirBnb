const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
        comment : {
            type:String,
            maxLength:70
        },
        rating : {
            type : String,
            min : 1,
            max : 5
        },
        creatAt : {
            type : Date,
            default : Date.now()
        },
        author : {
            type : Schema.Types.ObjectId ,
            ref : "User"
        }
});
const Review = mongoose.model("Review",reviewSchema)
module.exports = Review;