 const express = require("express");
const route = express.Router();
const UploadFiles = require("../middleware/UploadFiles");

 const CompanyController = require("../controllers/company");

 route.get("/supprimer", CompanyController.Company);
 route.post("/ajout",UploadFiles.single("avatar"), CompanyController.Ajout);
 route.delete("/delete/:id",CompanyController.Delete);
 route.get('/', CompanyController.GetAll);


module.exports = route;
