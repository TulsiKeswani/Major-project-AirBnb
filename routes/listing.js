const express = require("express");
const router = express.Router();
const wrapAsync = require("../utility/wrapAsync");
const {loggedIn,isOwner} = require("../middlewear.js");
const {validateSchema} = require("../middlewear.js")
const listingControllers = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
.get(wrapAsync(listingControllers.index))
.post(
    loggedIn,
   
    upload.array('listing[image][]',8),
    validateSchema,
    wrapAsync(listingControllers.createListing)
);

router.get("/search",listingControllers.searchResult);

 router.get("/new",loggedIn,listingControllers.renderNewForm);
 
 router
 .route("/:id")
 .get(wrapAsync(listingControllers.showListing))
 .put(
    loggedIn,
    isOwner,
    upload.array('listing[image][]',8),
    validateSchema,
   wrapAsync(listingControllers.updateListing)
)
.delete(
    loggedIn,
    isOwner,
    wrapAsync(listingControllers.destroy)
 );

 
 
 // edit route
 router.get("/:id/edit",
    loggedIn,
    isOwner,
     wrapAsync(listingControllers.renderEditForm)
 );
 
 
 
 module.exports = router ;