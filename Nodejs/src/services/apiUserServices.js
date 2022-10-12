import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExit = await checkUserEmail(email);
      if (isExit) {
        //user da ton tai
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong PassWord";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your sytem.Plz try Email`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        //user != undefined
        resolve(true);
      } else {
        //user == undefined
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
let hastUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPass = await bcrypt.hashSync(password, salt);
      resolve(hashPass);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used, plz try another email!",
        });
      } else {
        let hashPasswordFromBcrypt = await hastUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender,
          roleId: data.roleId,
          phonenumber: data.phonenumber,
          positionId: data.positionId,
          image: data.avata,
        });

        resolve({
          errCode: 0,
          errMessage: "Create New User Ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parmeters!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.email = data.email), (user.firstName = data.firstName);
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        if (data.avata) {
          user.image = data.avata;
        }
        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Update user success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User Not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "The user ins't exits",
        });
      }
      if (user) {
        await db.User.destroy({
          where: { id: id },
        });
      }

      resolve({
        errCode: 0,
        errMessage: "The User is delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodeSevices = (typeInput) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (!typeInput) {
        resovle({
          errCode: 1,
          errMessage: "Missing required parmeters!",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resovle(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getAllCodeSevices,
};
