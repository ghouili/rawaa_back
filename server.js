const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require('path');

const UserRoute = require("./routes/user");
const PartnerRoute = require("./routes/partner");
const CompanyRoute = require("./routes/company");
const AchatRoute = require("./routes/achat");

const PORT = 5000;

const server = express();

server.use(cors({
  origin: '*'
}));
server.use(bodyparser.json());

server.use("/uploads/images", express.static(path.join("uploads", "images")));

server.get("/index", (req, res) => {
  return res.send("Hello!!!");
});
server.use("/user", UserRoute);
server.use("/partner", PartnerRoute);
server.use("/company", CompanyRoute);
server.use("/achat", AchatRoute);

mongoose
  .connect(
    "mongodb+srv://admin:admin@bdpfe0.itztwah.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log("connected" + err);
  });
