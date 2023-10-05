const express=require("express")
const router=express.Router();

//import
const {register}=require("../controller/auth")
//import validators
const {userRegisterValidator}=require("../validator/auth")
//when you just specify without mentioning index it will figure it out by itself cause its named index
const {runValidation}=require("../validator")

router.post("/register",userRegisterValidator,runValidation,register)


module.exports=router;
