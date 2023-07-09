require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });


    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Huy Lee 👻" <huyleeclone@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });

}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.patientName}</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Huy Lee</p>
            <p>Thông tin đặt lịch khám bệnh</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <br/>
            <img src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/>
            <p>Nếu các thông tin trên là đúng sự thật, vui lòng nhấn vào link bên dưới để hoàn tất thủ tục khám bệnh!</p>
            <div><a href=${dataSend.redirectLink} target="_blank">Click here!</a></div>
            <div>Xin chân thành cảm ơn!</div>
            `
    }
    if (dataSend.language === 'en') {
        result = `
            <h3>Dear ${dataSend.patientName}</h3>
            <p>You received this email because you booked an online medical appointment on Huy Lee</p>
            <p>Information to book a medical appointment</p>
            <div><b>Duration: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <br/>
            <img src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/>
            <p>If the above information is true, please click on the link below to complete the medical examination procedure!</p>
            <div><a href=${dataSend.redirectLink} target="_blank">Click here!</a></div>
            <div>Sincerely thank you!</div>
            `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}