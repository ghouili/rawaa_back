const mongoose = require("mongoose");

const PartnerSchema = mongoose.Schema({
  name: { type: String, rquired: true },
  email: { type: String, rquired: true },
  phonenumber: { type: Number, rquired: true },
  governorat: { type: String, rquired: true },
  adresse:{type: String, required:false},
  avatar:{type:String,},
});
module.exports = mongoose.model("partner", PartnerSchema);
