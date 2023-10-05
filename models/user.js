const mongoose=require("mongoose")
const crypto=require("crypto")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        max:true,
        unique:true,
        index:true,
        lowerCase:true
    },
    name:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        max:32,
        unique:true,
        lowerCase:true
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:String,
    role:{
        type:String,
        default:"subscriber",
    },
    resetPasswordLink:{
        data:String,
    }
},{timestamps:true})

//virtual fiels
userSchema.virtual('password')
.set(function(password){
    //create temp variable called _password
    this._password=password
    //make salt
    this.salt=this.makeSalt();
    //encrypt password
    this.hashed_password=this.encryptPassword(password)
})
.get(function(password){
    return this._password;
})


//methods > authenticate,encryptPassword,generateSalt value

userSchema.methods={
    authenticate:function(plainText){
        return this.encryptPassword(plainText) == this.hashed_password;
    },
    encryptPassword:function(password){
        if(!password) return ""
        try {
            return crypto.createHmac("256",this.salt)
            .update(password)
            .digest("hex")
        } catch (error) {
            return ""
        }
    },
    makeSalt:function(){
        return Math.round(new Date().valueOf() + Math.random()) +""
    }
}



module.exports=mongoose.model("User",userSchema)