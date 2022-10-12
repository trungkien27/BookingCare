import { raw } from "body-parser";
import db from "../models/index";

let getDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getDoctorHome,
  getAllDoctor,
};
