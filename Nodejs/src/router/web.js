import express from "express";
import homeController from "../controller/homeController";
import apiUserController from "../controller/apiUserController";
import apiDoctorController from "../controller/apiDoctorController";
let router = express.Router();
let initWebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);

  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", apiUserController.handleLogin);
  router.get("/api/get-all-user", apiUserController.handleGetAllUser);
  router.post("/api/create-new-user", apiUserController.handleCreateUser);
  router.put("/api/edit-user", apiUserController.handleEditUser);
  router.delete("/api/delete-user", apiUserController.handleDeleteUser);

  router.get("/api/allcode", apiUserController.getAllCode);
  router.get("/api/top-docter-home", apiDoctorController.getTopDoctor);

  router.get("/api/get-all-doctor", apiDoctorController.getAllDoctor);
  return app.use("/", router);
};

export default initWebRouter;
