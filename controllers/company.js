const company = require("../models/company");

const Company = async (req, res) => {
  return res.send("company is working");
};

const Ajout = async (req, res) => {
  const { name, email, phonenumber, governorat ,adresse} = req.body;
  
  let avatar = "avatar.png";
  if (req.file) {
    console.log(req.file);
    avatar = req.file.filename;
  }
  let existCompany;
  try {
    existCompany = await company.findOne({ email: email });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something when wrong while extracting data",
      error: error,
    });
  }

  if (existCompany) {
    return res
      .status(200)
      .json({
        success: false,
        message: "company Already exist!!",
        error: false,
      });
  }

  //const hashedPassword = await bcrypt.hash(password, 10);

  const NewCompany = new company({
    name,
    email,
    phonenumber,
    governorat,
    adresse,
    avatar,

    //password: hashedPassword,
  });

  try {
    await NewCompany.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something when wrong while extracting data",
      error: error,
    });
  }

  return res
    .status(201)
    .json({ success: true, message: "success", data: NewCompany });
};

const Delete = async (req, res) => {
  const { id } = req.params;

  let existCompany;
  try {
    existCompany = await company.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "something when wrong while extracting data",
        error: error,
      });
  }

  if (!existCompany) {
    return res
      .status(200)
      .json({
        success: false,
        message: "company doesnt exist!!",
        error: false,
      });
  }

  try {
    await existCompany.deleteOne();
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
    .status(200)
    .json({ success: true, message: "company Deleted Successfully" });
};
const GetAll = async (req, res) => {
  let existCompanys;
  try {
    existCompanys = await company.find();
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
    .status(200)
    .json({ success: true, message: "success", data: existCompanys });
};

exports.Company = Company;
exports.Ajout = Ajout;
exports.Delete = Delete;
exports.GetAll = GetAll;
