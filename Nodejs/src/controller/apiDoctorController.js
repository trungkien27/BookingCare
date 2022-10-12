import apiDoctorServices from "../services/apiDoctorServices";

let getTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 6;

  try {
    let respone = await apiDoctorServices.getDoctorHome(+limit);
    return res.status(200).json(respone);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessge: "Error From server!",
    });
  }
};

let getAllDoctor = async (req, res) => {
  try {
    let doctor = await apiDoctorServices.getAllDoctor();
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server s!",
    });
  }
};
module.exports = {
  getTopDoctor,
  getAllDoctor,
};
