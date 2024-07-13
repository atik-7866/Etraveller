const Listing = require("../models/listing");
const Review=require("../models/review")

module.exports.signup=async (req,res)=>{
    try{
     let{username,email,password}=req.body
     const newUser=new User({email,username})
     const registeredUser=await User.register(newUser,password)
     req.login(registeredUser,(err)=>{
         if(err){
             return next(err)
         }
         req.flash("success","Welcome to etraveller!")
         res.redirect("/listings")
     })
     
    }catch(e){
     req.flash("error",e.message)
     res.redirect("/signup")
    }
 
 }
 module.exports.logout=async (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","Thanks For Visiting!")
        res.redirect("/listings")
    })
}
