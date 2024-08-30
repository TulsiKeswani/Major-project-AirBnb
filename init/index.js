const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");
require('dotenv').config({ path: '../.env' });
const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });;

main()
.then(() =>{
    console.log("connection built");
})
 .catch ((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
 

const initDb = async() =>{
        await listing.deleteMany({});
         initData.data = initData.data.map((obj) => ({...obj,owner: "66c59dfc318375469443f65e"}));
       
         for(let i=0; i < initData.data.length; i++){
           
            let result = await geocodingClient.forwardGeocode({
                query: initData.data[i].location,
                limit: 1
              })
                .send();
                initData.data[i].geometry = result.body.features[0].geometry;
         }
        await listing.insertMany(initData.data);
        console.log("data was intialize");
}
initDb();