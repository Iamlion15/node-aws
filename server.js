const express=require("express");
const morgan=require("morgan")
const bodyparser=require("body-parser")
const cors=require("cors")
const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const app=express()

//connect to the database
mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("Database connected"))
.catch(error=>console.log(error))

//import
const authRoute=require("./router/auth")
const userRoute=require("./router/user")


//app middlewares

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cors({origin:process.env.CLIENT_URL}))


//middleware
app.use("/api",authRoute)
app.use("/api",userRoute)

const PORT =process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})