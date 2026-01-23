const { Product } = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Validation
    if (!name || !description || !stock || !price || !category) {
      return res.status(400).json({
        message:
          "Please provide all required fields: name, description, price, category, and images",
      });
    }

    if (price < 0 || stock < 0) {
      return res.status(400).json({
        message: "Price and stock cannot be negative",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    if (req.files.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed" });
    }

    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, { folder: "products" });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Create new product
    const imageUrls = uploadResults.map((result) => result.secure_url);

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {};

const updateProduct = async (req, res) => {};

module.exports = { createProduct };
