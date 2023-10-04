const express=require("express")
const router=express.Router();

//import
const {register}=require("../controller/auth")

router.get("/register",register)


module.exports=router;
