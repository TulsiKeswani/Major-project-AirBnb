const mongoose = require("mongoose");
const Review = require("./reviews.js");
const Schema = mongoose.Schema;


const ListingSchema = new Schema({
    title : {
       type : String,
       required : true
    },
    description : String,
    image : {
        url : String,
        filename : String
    },
    price : Number,
    location: String,
    country : String,
    review : [
        {
        type : Schema.Types.ObjectId ,
        ref : "Review"
    }
    ],
    owner : {
        type : Schema.Types.ObjectId ,
        ref : "User"
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        //   required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
});

ListingSchema.post("findOneAndDelete",async (data) =>{
    if(data){
        await Review.deleteMany({_id : { $in : data.review}});
        console.log("Succesful deletion");
    }
})

const listing = mongoose.model("listing",ListingSchema);

module.exports= listing;



























