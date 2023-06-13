const mongoose = require("mongoose");

const AchatSchema = mongoose.Schema({
    montant: { type: Number, rquired: true },
    date: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: "user" },
    partner_id: { type: mongoose.Types.ObjectId, ref: "partner" },
    company_id: { type: mongoose.Types.ObjectId, ref: "comapny" },
});
module.exports = mongoose.model("achat", AchatSchema);
