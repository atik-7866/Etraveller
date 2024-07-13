const express=require("express")
const router=express.Router({mergeParams:true})
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const Listing = require("../models/listing.js");
const {reviewSchema}=require("../schema.js")
const Review=require("../models/review.js")
const {isLoggedIn,isReviewOwner}=require("../middleware.js")
const{reviewRoute,deleteRoute}=require("../controllers/review.js")
const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body)
      // console.log(result)
      if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
      }else next()
  }
  
  
  // Review route
  router.post("/",isLoggedIn,validateReview, wrapAsync(reviewRoute));
  
  // Delete review route
  
  router.delete("/:reviewId", isLoggedIn,isReviewOwner,wrapAsync( deleteRoute));

  module.exports=router