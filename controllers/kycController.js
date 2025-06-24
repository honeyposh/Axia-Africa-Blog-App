const kycModel = require("../models/kycModel");
const userModel = require("../models/userModel");
exports.createKyc = async (req, res) => {
  const payload = req.body;
  const { id } = req.user;
  try {
    const ckeckKycExist = await kycModel.findOne({ user: id });
    if (ckeckKycExist) {
      return res.json({ message: "kyc already exist" });
    }
    const newKyc = await kycModel.create({ user: id, ...payload });
    await userModel.findByIdAndUpdate(id, { kyc: newKyc.id }, { new: true });
    return res.send("kyc added succefully");
  } catch (error) {
    res.send(error.message);
  }
};
exports.getkyc = async (req, res) => {
  const { id } = req.params;
  try {
    const kyc = await kycModel.findById(id).populate("user");
    if (!kyc) {
      return res.send("kyc doesnt exist");
    }
    if (kyc.user.id != req.user.id) {
      return res.send("You are not authorized to view this kyc");
    }
    return res.json(kyc);
  } catch (error) {
    return res.send(error.message);
  }
};
exports.deleteKyc = async (req, res) => {
  const { kycId } = req.params;
  const { id } = req.user;
  try {
    const kyc = await kycModel.findById(kycId);
    if (!kyc) {
      return res.status(404).json({ message: "kyc doesnt exist" });
    }
    if (kyc.user != id) {
      return res.status(400).json({ message: "cannot delete this kyc" });
    }
    await kycModel.findByIdAndDelete(kycId);
    await userModel.findByIdAndUpdate(id, { kyc: null }, { new: true });
    return res.send("successfully deleted");
  } catch (error) {
    res.send(error.message);
  }
};
exports.updateKyc = async (req, res) => {
  const { kycId } = req.params;
  const { id } = req.user;
  const body = req.body;
  try {
    const kyc = await kycModel.findById(kycId);
    if (!kyc) {
      return res.status(404).json({ message: "kyc doesnt exist" });
    }
    if (kyc.user != id) {
      return res.status(400).json({ message: "cannot delete this kyc" });
    }
    const updatedKyc = await kycModel.findByIdAndUpdate(
      kycId,
      { ...body },
      { new: true }
    );
    return res.status(200).json(updatedKyc);
  } catch (error) {
    res.send(error.message);
  }
};
