const express = require("express");
const UploadFiles = require("../middleware/UploadFiles");

const route = express.Router();

const PartnerController = require("../controllers/partner");

route.post("/ajout",UploadFiles.single("avatar"), PartnerController.Ajout);
route.delete("/delete/:id", PartnerController.Delete);
route.get("/", PartnerController.GetAll);
route.put("/update/:id", PartnerController.Update);

module.exports = route;
