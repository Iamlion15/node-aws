const User = require("../models/user")
const AWS = require("aws-sdk")
const jwt = require("jsonwebtoken")
const {registerEmailParams} = require("../helpers/email");

AWS.config.update({
    accesskeyid: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})
const ses = new AWS.SES({ apiVersion: "2010-12-01" })
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email })
    if (!checkUser == null) {
        return res.status(400).json({ message: "email is taken" })
    }
    else {
        //generate jwt token
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_VALIDATION, {
            expiresIn: '18m'
        })
        //send mail
        const params = registerEmailParams(email, token)
        const sendEmailOnRegistration = ses.sendEmail(params).promise()
        sendEmailOnRegistration.then(data => {
            console.log("email submitted on SES ", data)
            res.json({
                message:`email has been sent to ${email}`
            })
        })
            .catch(error => {
                console.log("ses failed to send email", error)
                res.json({
                    message:"we could not verify your email please try again"
                })
            })

    }
}
