import db from "../models/index";
import bcrypt from 'bcrypt';

const saltRounds = 10;

let hashUserPassword = (password) => {
    return new Promise(async (res, rej) => {
        try {
            let salt = await bcrypt.genSalt(saltRounds);
            let hash = await bcrypt.hash(password, salt);
            res(hash);
        }
        catch (e) {
            rej(e);
        }

    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (res, rej) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true

                })
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }

                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system!`;
                res(userData);
            }
            res(userData);
        } catch (e) {
            rej(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                res(true);
            } else {
                res(false);
            }
        } catch (e) {
            rej(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            res(users);
        } catch (e) {
            rej(e);
        }
    })
}

let CreateUser = (data) => {
    return new Promise(async (res, rej) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                res({
                    errCode: 1,
                    errMessage: `Your's email is already in used. Plz try another email!`
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                res({
                    errCode: 0,
                    message: 'Ok'
                });
            }
        }
        catch (e) {
            rej(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (res, rej) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            res({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        });
        res({
            errCode: 0,
            message: `The user is deleted!`
        })
    })
}

let editUser = (data) => {
    return new Promise(async (res, rej) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                res({
                    errCode: 2,
                    errMessage: 'Missing required paramater!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;

                if (data.avatar) {
                    user.image = data.avatar
                }


                await user.save();

                res({
                    errCode: 0,
                    errMessage: 'Updated the user success!'
                });
            } else {
                rej({
                    errCode: 1,
                    errMessage: `User isn't found`
                });
            }


        } catch (e) {
            rej(e);
        }
    })
}

let getAllCodes = (typeInput) => {
    return new Promise(async (res, rej) => {
        try {
            if (!typeInput) {
                res({
                    errCode: 1,
                    errMessage: 'Missing paramater!'
                })
            } else {
                let resp = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                resp.errCode = 0;
                resp.data = allcode;
                res(resp);
            }


        } catch (e) {
            rej(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    CreateUser: CreateUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCodes: getAllCodes
}