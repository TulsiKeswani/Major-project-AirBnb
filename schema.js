const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        hostName : Joi.string().required(),
        description : Joi.string().required(),
        location: Joi.array().items(Joi.string().required()).min(2).max(2).required(),
        country : Joi.string().required(),
        price : Joi.number().min(0).required(),
        image : Joi.array().items(
            Joi.object({
                url: Joi.string().uri().required(),
                filename: Joi.string().required()
            })
        ).allow(null),
        facilities: Joi.array().items(Joi.string()).min(2).required(),
        category: Joi.string().valid( 
            'Trending', 'Castles', 'Campign', 'Farms', 'Amazing pools',
            'Beach Front', 'Cabin', 'Boats', 'Rooms', 'Mountain',
            'Historical places', 'Arctic', 'ski-in/out', 'Other'
        ).required()
    }).required(),
   
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().min(1).max(5).required(),
        comment : Joi.string().required(),
    }).required(),
});

