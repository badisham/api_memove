require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
exports.SendOTP = (toEmail, otp) => {
    var mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: 'OTP from Memove',
        text: 'OTP : ' + otp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
