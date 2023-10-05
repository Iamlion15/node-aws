const AWS = require("aws-sdk")

AWS.config.update({
    accesskeyid: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})
const ses = new AWS.SES({ apiVersion: "2010-12-01" })
exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const params = {
        Source: process.env.EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<html><body><h1>hello ${name}</h1><p style="color:red;">Test email</p></body></html>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    }
    const sendEmailOnRegistration = ses.sendEmail(params).promise()
    sendEmailOnRegistration.then(data => {
        console.log("email submitted on SES ", data)
        res.send("Email sent")
    })
        .catch(error => {
            console.log("ses failed to send email", error)
            res.send("email failed")
        })
}
