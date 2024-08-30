const Listing = require("../models/listing.js");
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });;

module.exports.index = async (req,res) =>{
    const allListing =  await Listing.find();
     res.render ("listings/index.ejs",{allListing});
 };

 module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.createListing = async (req,res) =>{
   let result = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
       
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id;
     newListing.image = {url,filename} ;
     newListing.geometry = result.body.features[0].geometry ;
   let resu = await newListing.save();
   console.log(resu);
    req.flash("success","Listing Succefully Added!");
    res.redirect("/listings");
  };


  module.exports.showListing = async (req,res) =>{
    let {id} = req.params;
     const ind_listing = await Listing.findById(id).populate({path : "review",populate : {path : "author"}}).populate("owner");
     if(!ind_listing){
        req.flash("error","Listing you are requsted for doesn't exist");
        res.redirect("/listings");
     } else{
        res.render("listings/show.ejs",{ind_listing});
     }
    
 };

 module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const E_listing = await Listing.findById(id);
    
    
    if(!E_listing){
       req.flash("error","Listing you are requsted for edit doesn't exist");
       res.redirect("/listings");
    } else {
        const originalUrl = E_listing.image.url;
        originalUrl.replace(("/upload","upload/h_300,w_250"));
       res.render("listings/edit.ejs",{E_listing,originalUrl});
    }
   
};

module.exports.updateListing = async (req,res) =>{
    let {id} = req.params;
   
   let listing = await  Listing.findByIdAndUpdate(id,{...req.body.listing});

   if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
}
   req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req,res)=>{
    let {id} = req.params;
    let deltedList = await Listing.findByIdAndDelete(id);
    console.log(deltedList);
    req.flash("success","Listing Succefully deleted!");
    res.redirect("/listings");
};

