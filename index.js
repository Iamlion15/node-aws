const express=require("express");
const app=express()

//import
const authRoute=require("./router/auth")

//middleware
app.use("/api",authRoute)

const PORT =process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})