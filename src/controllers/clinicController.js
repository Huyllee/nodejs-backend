import clinicService from '../services/clinicService'

let handleCreateNewClinic = async (req, res) => {
    try {
        let infor = await clinicService.createNewClinic(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleGetDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
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
    handleCreateNewClinic: handleCreateNewClinic,
    handleGetAllClinic: handleGetAllClinic,
    handleGetDetailClinicById: handleGetDetailClinicById
}