const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS
    }
})


const sendMailer = async (to, subject, html) => {
    const option = {
        from : process.env.MY_EMAIL,
        to, subject, html
    }

    await transporter.sendMail(option, (err, info)=> {
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}

module.exports = sendMailer