const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")

const loginUser = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  
  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")
  console.log(foundUserFromEmail);
  
  if (foundUserFromEmail != null) {
   
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};

const signup = async (req, res) => {
  //try catch if else...
  try {
    //password encrupt..
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(createdUser.email,"welcome to eadvertisement","this is welcome mail")
    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUser = async (req, res) => {
  //req.body...
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "User Saved Successfully",
    data: savedUser,
  });
};
const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.json({
    message: "User fetched successfully..",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundUser,
  });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted Successfully..",
    data: deletedUser,
  });
};

//wishlist
const getUserWishlist = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    const updatedUser = await userModel.findById(userId).populate("wishlist");
    res.status(200).json({ message: "Added to wishlist", data: updatedUser.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body; // ✅ fixed from propertyId
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    const updatedUser = await userModel.findById(userId).populate("wishlist");
    res.status(200).json({ message: "Removed from wishlist", data: updatedUser.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
};

//addUser
//getUser
//deleteUser
//getUserById

//exports