const express=require("express");
const morgan=require("morgan")
const bodyparser=require("body-parser")
const cors=require("cors")
const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const app=express()

//import
const authRoute=require("./router/auth")

//middleware
app.use("/api",authRoute)

const PORT =process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})