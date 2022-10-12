import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUser = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const updateUserSevice = (data) => {
  return axios.put("/api/edit-user", data);
};

const deleteUserSevice = (id) => {
  return axios.delete("/api/delete-user", {
    data: { id: id },
  });
};

const getAllCodeSevices = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorHomeSevices = (limit) => {
  return axios.get(`/api/top-docter-home?limit=${limit}`);
};

const getAllDoctorSevices = () => {
  return axios.get(`/api/get-all-doctor`);
};
export {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserSevice,
  updateUserSevice,
  getAllCodeSevices,
  getTopDoctorHomeSevices,
  getAllDoctorSevices,
};
