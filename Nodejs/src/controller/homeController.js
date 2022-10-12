import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("index.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let massge = await CRUDServices.createNewUser(req.body);
  console.log(massge);
  return res.send("Ok user");
};

let displayCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  return res.render("crud.ejs", { dataTable: data });
};

let getEditCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let userData = await CRUDServices.getUserInforId(id);
    return res.render("edit-crud.ejs", { userData: userData });
  } else {
    return res.send("Edit not fount");
  }
};

let putCRUD = async (req, res) => {
  try {
    let data = req.body;
    let allUser = await CRUDServices.updateUserData(data);

    return res.render("crud.ejs", { dataTable: allUser });
  } catch (error) {
    console.log(error);
  }
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDServices.deleteUserById(id);
    return res.send("Delete User");
  }
  return res.send("User Delete not found");
};
module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
