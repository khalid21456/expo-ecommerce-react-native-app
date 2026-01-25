const { Product } = require("../models/product.model");

const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};


const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = Product.findById(id)
    if(!product) return res.status(404).json({message:"Product Not Found !",success:false})
    res.status(200).json({product})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }

}

module.exports = { getAllProducts, getProductById}
