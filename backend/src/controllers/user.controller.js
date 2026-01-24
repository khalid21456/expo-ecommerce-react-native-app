const { User } = require("../models/user.model");

// Add Address
const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAdress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    const user = req.user;
    if (isDefault) {
      user.addresses.forEach((element) => {
        element.isDefault = false;
      });
    }
    user.addresses.push({
      label,
      fullName,
      streetAdress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    res.status(200).json({ message: "addresse added successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding addresse",
      error: error.message,
    });
  }
};

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;
    if (user.wishList.includes(productId)) {
      res.status(400).json({ message: "Error" });
    }
    user.wishList.push({ productId });
    await user.save();
    res.status(201).json({ message: "Adding wish" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding a wish",
      error: error.message,
    });
  }
};

// Delete Address
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = req.user;
    // const newAdresses = user.addresses.filter((address) => address._id.toString() !== addressId);
    user.addresses.pull(addressId);
    await user.save();
    res.status(200).json({ message: "Address deleted successfully !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};

// Get Addresses
const getAddresses = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    res.status(200).json({ wishList: req.user.wishList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching wishList",
      error: error.message,
    });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    // check if product is already in the wishlist
    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ error: "Product not found in wishlist" });
    }

    user.wishlist.pull(productId);
    await user.save();

    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error in removeFromWishlist controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Address
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const {
      label,
      fullName,
      streetAdress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const user = req.user;
    if (isDefault) {
      user.addresses.forEach((element) => {
        element.isDefault = false;
      });
    }

    const addresse = user.addresses.id(addressId);

    if (!addresse) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (label) addresse.label = label;
    if (fullName) addresse.fullName = fullName;
    if (streetAdress) addresse.streetAdress = streetAdress;
    if (city) addresse.city = city;
    if (state) addresse.state = state;
    if (zipCode) addresse.zipCode = zipCode;
    if (phoneNumber) addresse.phoneNumber = phoneNumber;
    if (isDefault) addresse.isDefault = true;

    await user.save();
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error: error.message,
    });
  }
};

module.exports = {
  addAddress,
  addToWishlist,
  deleteAddress,
  getAddresses,
  getWishlist,
  removeFromWishlist,
  updateAddress,
};
