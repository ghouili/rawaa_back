const express = require("express");
const UploadFiles = require("../middleware/UploadFiles");

const route = express.Router();

const PartnerController = require("../controllers/partner");

route.get("/", PartnerController.GetAll);

route.post("/ajout",UploadFiles.single("avatar"), PartnerController.Ajout);

route.put("/update/:id", PartnerController.Update);

route.post("/login", PartnerController.Login);

route.delete("/delete/:id", PartnerController.Delete);

module.exports = route;
