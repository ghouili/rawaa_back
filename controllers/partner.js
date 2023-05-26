const partner = require("../models/partner");


const Partner = async(resq,res)=>{
    return res.send('Partner is working'); 

  }

  const Ajout = async (req, res) => {
    const { name,email,phonenumber,governorat,adresse} = req.body;
  
    let avatar = "avatar.png";
    if(req.file){
      console.log(req.file);
      avatar = req.file.filename;
    }
    let existPartner;
    try {
        existPartner = await partner.findOne({ email: email });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "something when wrong while extracting data",
          error: error,
        });
    }
  
    if (existPartner) {
      return res
        .status(200)
        .json({ success: false, messgae: "partner Already exist!!", error: false });
    }
  
    //const hashedPassword = await bcrypt.hash(password, 10);
  
    const NewPartner = new partner({
      name,
      email,
      phonenumber,
      governorat,
      adresse,
      avatar,
      
      //password: hashedPassword,
    });
  
    try {
      await NewPartner.save();
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
      .json({ success: true, message: "success", data: NewPartner });
  };
  
  const Delete = async (req, res) => {

    const { id } = req.params;
  
    let existPartner
    try {
        existPartner = await partner.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }
  
    if (!existPartner) {
        return res.status(200).json({success: false, messgae: 'partner doesnt exist!!', error: false});
    }
  
    try {
        await existPartner.deleteOne();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})
    }
    return res.status(200).json({success: true, message: 'Partner Deleted Successfully'});
  
  }

  const GetAll = async (req, res) => {

    let existPartners
    try {
        existPartners = await partner.find();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }
  
    return res.status(200).json({success: true, message: 'success', data: existPartners});
  
  }

  const Update = async (req, res) => {

    const {name, email, phonenumber, governorat,adresse} = req.body;
    const { id } = req.params;
  
    let existPartner
    try {
        existPartner = await partner.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})        
    }
  
    if (!existPartner) {
        return res.status(200).json({success: false, messgae: 'user doesnt exist!!', error: false});
    }
  
    
    existPartner.name = name;
    existPartner.email = email;
    existPartner.phonenumber = phonenumber;
    existPartner.governorat = governorat;
    existPartner.adresse=adresse;

  
    try {
        await existPartner.save();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something when wrong while extracting data', error: error})
    }
  
    return res.status(200).json({success: true, message: 'success', data: existPartner});
  }

  exports.Partner=Partner
  exports.Ajout=Ajout
  exports.Delete=Delete
  exports.GetAll=GetAll
  exports.Update=Update