import doctorService from '../services/doctorService'

let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctor(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handlePostInforDoctor = async (req, res) => {
    try {
        let responsive = await doctorService.postInforDoctor(req.body);
        return res.status(200).json(responsive);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleBulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetScheduleByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetExtraProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraProfileDoctorById(req.query.doctorId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetListPatient = async (req, res) => {
    try {
        let infor = await doctorService.getListPatient(req.query.doctorId, req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handlePostSendRemery = async (req, res) => {
    try {
        let infor = await doctorService.postSendRemery(req.body);
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
    handleGetTopDoctor: handleGetTopDoctor,
    handleGetAllDoctors: handleGetAllDoctors,
    handlePostInforDoctor: handlePostInforDoctor,
    handleGetDetailDoctorById: handleGetDetailDoctorById,
    handleBulkCreateSchedule: handleBulkCreateSchedule,
    handleGetScheduleByDate: handleGetScheduleByDate,
    handleGetExtraInforDoctorById: handleGetExtraInforDoctorById,
    handleGetExtraProfileDoctorById: handleGetExtraProfileDoctorById,
    handleGetListPatient: handleGetListPatient,
    handlePostSendRemery: handlePostSendRemery
}