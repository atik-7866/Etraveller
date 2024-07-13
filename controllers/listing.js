const Listing = require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }
  module.exports.newForm=(req, res) => {
   
    res.render("listings/new.ejs");
  }
  module.exports.show= async (req, res) => {
    let { id } = req.params;
    const l = await Listing.findById(id).populate({path:"reviews",populate:{path: "author"}}).populate("owner");
    if(!l){
        req.flash("error","Listing You requested does not exist!")
        res.redirect("/listings")
    }
     res.render("listings/show.ejs", { l });
  }

  module.exports.create=async (req, res) => {
      
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Added!!!")
    res.redirect("/listings");
  
 
}
  module.exports.edit=async (req, res) => {
    let { id } = req.params;
    const l= await Listing.findById(id);
    if(!l){
        req.flash("error","Listing You requested does not exist!")
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs", { l });
  }
  module.exports.update=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`);
  }
  module.exports.deleteRoute=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!")
    res.redirect("/listings");
  }
   