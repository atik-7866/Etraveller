const express=require("express")
const router=express.Router({mergeParams:true})
const User=require("../models/user.js")
const wrapAsync=require("../utils/wrapAsync.js")
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware.js")

// SIGNUP
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup",wrapAsync(async (req,res)=>{
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

}))


// LOGIN
router.get("/login",async (req,res)=>{
    res.render("users/login.ejs")
})

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),wrapAsync(async (req,res)=>{
   req.flash("success","Lets travel again!")
   let ridirectU = res.locals.redirectUrl || "/listings"
  res.redirect(ridirectU )
 }))

 
// LOGOUT
 router.get("/logout",async (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }
        req.flash("success","Thanks For Visiting!")
        res.redirect("/listings")
    })
})




module.exports=router