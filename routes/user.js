const express=require("express")
const router=express.Router({mergeParams:true})
const User=require("../models/user.js")
const wrapAsync=require("../utils/wrapAsync.js")
const passport=require("passport")
const {saveRedirectUrl}=require("../middleware.js")
const {signup,logout}=require("../controllers/user.js")


router.route("/signup")
.get((req,res)=>{
    res.render("users/signup.ejs")
})
.post(wrapAsync(signup))
// SIGNUP
// router.get("/signup",(req,res)=>{
//     res.render("users/signup.ejs")
// })

// router.post("/signup",wrapAsync(signup))


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
 router.get("/logout",logout)




module.exports=router