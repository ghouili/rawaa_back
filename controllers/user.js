const user = require("../models/user");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const nodemailer = require("nodemailer");

const User = async (req, res) => {
  return res.send("user is working");
};

const Ajout = async (req, res) => {
  const { firstname, lastname, email, phonenumber, governorat, date, role, id_entreprise } =
    req.body;

    let avatar = "avatar.png";
    if(req.file){
      console.log(req.file);
      avatar = req.file.filename;
    }

  let existUser;
  try {
    existUser = await user.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "something when wrong while extracting data",
        error: error,
      });
  }

  if (existUser) {
    return res
      .status(200)
      .json({ success: false, message: "user Already exist!!", error: false });
  }

  // let password = 'secret';
  let password = generator.generate({
    length: 8,
    numbers: true,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const NewUser = new user({
    firstname,
    lastname,
    email,
    phonenumber,
    governorat,
    date,
    role,
    avatar,
    id_entreprise,
    password: hashedPassword,
  });

  try {
    await NewUser.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something when wrong while extracting data",
      error: error,
    });
  }

  var transporter = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    service: "gmail",
    // port: 2525,
    auth: {
      user: "sebntn.contact@gmail.com",
      pass: "joucivcesyymsnjd",
    },
  });

  let info = await transporter.sendMail({
    from: "sebntn.contact@gmail.com", // sender address
    to: email, // list of receivers
    subject: "New Account Created", // Subject line
    // text: "Hello world?", // plain text body
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 20px;">
        <h1 style="text-align: center; color: #3d3d3d; margin-bottom: 40px;">Welcome to Our App!</h1>
        <p style="font-size: 18px; color: #3d3d3d;">Dear ${lastname} ${firstname},</p>
        <p style="font-size: 18px; color: #3d3d3d;">Your new account has been successfully created in our App as a(n) <strong>${role}</strong>.</p>
        <p style="font-size: 18px; color: #3d3d3d;">Please keep your password in a safe place. You can change your password anytime by logging into your account.</p>
        <p style="font-size: 18px; color: #3d3d3d;">Here is your password: <strong>${password}</strong></p>
        <div style="text-align: center; margin-top: 40px;">
            <a href="https://www.google.com/" style="display: inline-block; background-color: #0066ff; color: white; font-size: 18px; padding: 12px 30px; text-decoration: none; border-radius: 30px;">Check out our App</a>
        </div>
        <p style="font-size: 16px; color: #666; margin-top: 40px;">Thank you for using our App!</p>
    </div>
</div>
    `, // html body
  });

  return res
    .status(201)
    .json({ success: true, message: "success", data: NewUser });
};

const Delete = async (req, res) => {
  const { id } = req.params;

  let existUser;
  try {
    existUser = await user.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "something when wrong while extracting data",
        error: error,
      });
  }

  if (!existUser) {
    return res
      .status(200)
      .json({ success: false, messgae: "user doesnt exist!!", error: false });
  }

  try {
    await existUser.deleteOne();
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
    .json({ success: true, message: "User Deleted Successfully" });
};

const GetAll = async (req, res) => {
  let existUsers;
  try {
    existUsers = await user.find();
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
    .json({ success: true, message: "success", data: existUsers });
};
const Update = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phonenumber,
    governorat,
    date,
    role,
    password,
  } = req.body;
  const { id } = req.params;

  let existUser;
  try {
    existUser = await user.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "something when wrong while extracting data",
        error: error,
      });
  }

  if (!existUser) {
    return res
      .status(200)
      .json({ success: false, messgae: "user doesnt exist!!", error: false });
  }

  existUser.firstname = firstname;
  existUser.lastname = lastname;
  existUser.email = email;
  existUser.phonenumber = phonenumber;
  existUser.governorat = governorat;
  existUser.date = date;
  existUser.role = role;
  existUser.password = password;

  try {
    await existUser.save();
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
    .json({ success: true, message: "success", data: existUser });
};
const Login = async (req, res) => {
  //recieve data:
  const { email, password } = req.body;

  //check user if exist:
  let existUser;
  try {
    existUser = await user.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "something when wrong while extracting data",
        error: error,
      });
  }

  if (!existUser) {
    return res
      .status(200)
      .json({ success: false, messgae: "user doesnt exist!!", error: false });
  }

  //compare password:
  let check = await bcrypt.compare(password, existUser.password);

  if (!check) {
    return res
      .status(200)
      .json({ success: false, messgae: "Check your password!!", error: false });
  }

  return res
    .status(200)
    .json({ success: true, message: "success", data: existUser });
};

exports.User = User;
exports.Ajout = Ajout;
exports.Delete = Delete;
exports.GetAll = GetAll;
exports.Update = Update;
exports.Login = Login;
