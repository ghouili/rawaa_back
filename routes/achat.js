const express = require("express");
const route = express.Router();

const achatController = require("../controllers/achat");

route.get("/", achatController.GetAll);

route.post("/add", achatController.Add);

route.post("/ajout", achatController.Ajout);

route.put("/update/:id", achatController.Update);

route.delete("/delete/:id", achatController.Delete);

module.exports = route;
