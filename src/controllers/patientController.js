import patientService from '../services/patientService'

let handlePatientBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.patientBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.verifyBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

module.exports = {
    handlePatientBookAppointment: handlePatientBookAppointment,
    handleVerifyBookAppointment: handleVerifyBookAppointment
}