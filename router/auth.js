const express=require("express")
const router=express.Router();

//import
const {register,registerActivate,login,requireSignIn}=require("../controller/auth")
//import validators
const {userRegisterValidator,userLoginValidator}=require("../validator/auth")
//when you just specify without mentioning index it will figure it out by itself cause its named index
const {runValidation}=require("../validator")

router.post("/register",userRegisterValidator,runValidation,register)
router.post("/login",userLoginValidator,runValidation,login)
router.post("/register/activate",requireSignIn,registerActivate)
router.get("/secret",(req,res)=>{
    res.json({
        message:"this is protected"
    })
})


module.exports=router;
