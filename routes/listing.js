const express=require("express")
const router=express.Router()
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner}=require("../middleware.js")
const {listingSchema}=require("../schema.js")
const {create ,edit ,update,deleteRoute,show,newForm,index}=require("../controllers/listing.js")


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body)
      // console.log(result)
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
      }else next()
  }

  // Using Route.route
  router.
  route("/")
  .get(wrapAsync(index))
  .post(isLoggedIn,validateListing, wrapAsync(create));

   //New Route
   router.get("/new",isLoggedIn, newForm);
router.route("/:id")

  .put(isLoggedIn,isOwner,validateListing, wrapAsync(update))
  .delete( isLoggedIn,isOwner,deleteRoute)
  .get(show );
// //Index Route
// router.get("/", wrapAsync(index));
 
  //Show Route
  // router.get("/:id",show );
  
  //Create Route
  // router.post("/",isLoggedIn,validateListing, wrapAsync(create));
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn,isOwner,edit);
  
  //Update Route
  // router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(update));
  
  //Delete Route
  // router.delete("/:id", isLoggedIn,isOwner,deleteRoute);

  module.exports=router