const { Product } = require("../models/product.model");
const  cloudinary =  require("../config/cloudinary.js");
const { Order } = require("../models/order.model.js");
const { User } = require("../models/user.model.js");


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
    // secure URLs
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

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products)
      return res.statsu(404).json({ message: "No products found" });
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, stock, category } = req.body;
    const product = await Product.findById({ id });
    if (!product)
      return res
        .status(404)
        .json({ message: "Product Not Found !", success: false });
    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (stock !== undefined) product.stock = parseInt(stock);
    if (category) product.category = category;

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

    const imageUrls = uploadResults.map((result) => result.secure_url);
    product.images = imageUrls.map((result) => result.secure_url);

    await product.save();
    return res.status(200).json({ message: "Product updated successfully !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

const getAllOrders = async (_, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params;
    const { status } = req.body;
    if (!["pending", "shipped", "delivered"].includes(status)) {
      res.status(400).json({ message: "Invalid status", success: false });
    }

    const order = await Order.findById({ orderId });
    order.status = status;
    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }

    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save(order);
    res
      .status(200)
      .json({ message: "Order updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
};

const getAllCustomers = async (_, res) => {
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ customers });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching customers",
      error: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    const totalCustomers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteProduct = async(req,res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl) => {
        // Extract public_id from URL (assumes format: .../products/publicId.ext)
        const publicId = "products/" + imageUrl.split("/products/")[1]?.split(".")[0];
        if (publicId) return cloudinary.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises.filter(Boolean));
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  getAllCustomers
};
