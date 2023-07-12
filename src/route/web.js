import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from '../controllers/clinicController'

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.handleCreateUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/get-allcodes', userController.handleGetAllCodes);

    router.get('/api/get-top-doctor', doctorController.handleGetTopDoctor);
    router.get('/api/get-all-doctors', doctorController.handleGetAllDoctors);
    router.post('/api/post-infor-doctor', doctorController.handlePostInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.handleGetDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.handleBulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.handleGetScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.handleGetExtraInforDoctorById);
    router.get('/api/get-extra-profile-doctor-by-id', doctorController.handleGetExtraProfileDoctorById);
    router.get('/api/get-list-patient', doctorController.handleGetListPatient);
    router.post('/api/send-remedy', doctorController.handlePostSendRemery);

    router.post('/api/patient-book-appointment', patientController.handlePatientBookAppointment);
    router.post('/api/verify-book-appointment', patientController.handleVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.handleCreateNewSpecialty);
    router.get('/api/get-specialty', specialtyController.handleGetAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.handleGetDetailSpecialtyById);

    router.post('/api/create-new-clinic', clinicController.handleCreateNewClinic);
    router.get('/api/get-clinic', clinicController.handleGetAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.handleGetDetailClinicById);

    return app.use("/", router);
}

module.exports = initWebRoutes;