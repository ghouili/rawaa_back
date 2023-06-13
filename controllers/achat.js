const moment = require("moment/moment");
const achat = require("../models/achat");
const user = require("../models/user");

const Add = async (req, res) => {
    const {
        montant,
        user_id,
        partner_id
    } = req.body;

    let existUser;
    try {
        existUser = await user.findById(user_id);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while extracting user data",
            error: error,
        });
    }

    let date = moment().format('LLLL');
    const Newachat = new achat({
        montant,
        date,
        user_id,
        partner_id,
        company_id: existUser?.id_entreprise,
    });

    try {
        await Newachat.save();
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "something when wrong while extracting data",
                error: error,
            });
    }

    return res
        .status(201)
        .json({ success: true, message: "success", data: Newachat });
};

const Ajout = async (req, res) => {
    const {
        montant,
        user_id,
        partner_id,
        company_id
    } = req.body;

    let date = moment().format('LLLL');
    const Newachat = new achat({
        montant,
        date,
        user_id,
        partner_id,
        company_id,
    });

    try {
        await Newachat.save();
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "something when wrong while extracting data",
                error: error,
            });
    }

    return res
        .status(201)
        .json({ success: true, message: "success", data: Newachat });
};

const Delete = async (req, res) => {

    const { id } = req.params;

    let existachat
    try {
        existachat = await achat.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existachat) {
        return res.status(200).json({ success: false, message: 'achat doesnt exist!!', error: false });
    }

    try {
        await existachat.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'achat Deleted Successfully' });

}

const GetAll = async (req, res) => {

    let existachats
    try {
        existachats = await achat.find().populate("user_id").populate("partner_id").populate("company_id");

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existachats });

}

const Update = async (req, res) => {

    const {
        montant,
        user_id,
        partner_id,
        company_id
    } = req.body;
    const { id } = req.params;

    let existachat
    try {
        existachat = await achat.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existachat) {
        return res.status(200).json({ success: false, message: 'user doesnt exist!!', error: false });
    }

    existachat.montant = montant;
    existachat.user_id = user_id;
    existachat.partner_id = partner_id;
    existachat.company_id = company_id;

    try {
        await existachat.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existachat });
}

exports.Add = Add
exports.Ajout = Ajout
exports.Delete = Delete
exports.GetAll = GetAll
exports.Update = Update