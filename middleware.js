const Listing=require("./models/listing")
const Review=require("./models/review")

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){

        // information about the pevious path
         req.session.redirectUrl= req.originalUrl
        req.flash("error","You are not logged in!")
        res.redirect("/login")

    }
    next()
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(  !listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","Sorry, Only the owner can update the listing!")
     return res.redirect(`/listings/${id}`)
}
next()
}
module.exports.isReviewOwner=async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(  !review.author.equals(res.locals.currUser._id)){
      req.flash("error","Access Denied!")
     return res.redirect(`/listings/${id}`)
}
next()
}