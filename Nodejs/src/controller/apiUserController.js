import apiUserServices from "../services/apiUserServices";

let handleLogin = async (req, res) => {
  //check email exit
  //compare password
  //return userInfor
  //access_token JWT(josn web token)

  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter!",
    });
  }
  let userData = await apiUserServices.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //All, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Required Paramters",
      user: [],
    });
  }

  let user = await apiUserServices.getAllUser(id);
  // console.log(user);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    user,
  });
};

let handleCreateUser = async (req, res) => {
  let message = await apiUserServices.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await apiUserServices.updateUser(data);

  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parmeters!",
    });
  }
  let message = await apiUserServices.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await apiUserServices.getAllCodeSevices(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from Server",
    });
  }
};
module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
};
