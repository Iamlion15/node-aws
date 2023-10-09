const express=require("express")
const router=express.Router();
const {read}=require("../controller/user")

const{requireSignIn,AdminMiddleware,authMiddleware}=require("../controller/auth")

router.get("/user",requireSignIn,authMiddleware,read)
router.get("/admin",requireSignIn,AdminMiddleware,read)

module.exports=router;
