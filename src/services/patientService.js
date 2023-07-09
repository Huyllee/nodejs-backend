import db from '../models/index';
import emailService from '../services/emailService'
require('dotenv').config();

let patientBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType
                || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'https://nodemailer.com/about/'
                })
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id, },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Create a new patient success',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    patientBookAppointment: patientBookAppointment
}