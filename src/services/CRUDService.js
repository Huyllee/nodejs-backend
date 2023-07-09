import bcrypt from 'bcrypt';
import db from '../models/index';

const saltRounds = 10;

let createNewUser = async (data) => {
    return new Promise(async (res, rej) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            res('ok create a new user succeed!');
        } catch (e) {
            rej(e);
        }
    })


}

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

let getAllUser = () => {
    return new Promise(async (res, rej) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            res(users)
        } catch (e) {
            rej(e);
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })

            if (user) {
                res(user)
            }
            else {
                res({})
            }
        } catch (e) {
            rej(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;
                await user.save();

                let allUsers = await db.User.findAll();
                res(allUsers);
            } else {
                rej();
            }


        } catch (e) {
            rej(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            res();
        } catch (e) {
            rej(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}