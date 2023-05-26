const express = require("express");
const UploadFiles = require("../middleware/UploadFiles");
const route = express.Router();

const UserController = require("../controllers/user");

route.get("/", UserController.GetAll);
route.post("/ajout", UploadFiles.single("avatar"), UserController.Ajout);
route.delete("/delete/:id", UserController.Delete);
route.put("/update/:id", UserController.Update);
route.post("/login", UserController.Login);

module.exports = route;
