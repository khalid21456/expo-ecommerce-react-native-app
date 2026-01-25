const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body
        const product = await Product.findById({ productId })
        if (!product) return res.status(404).json({ message: "Product not found" })
        if (product.stock < quantity) return res.status(400).json({ message: "Insufficient stock" })
        let cart = await Cart.findOne({ user: req.user._id, clerkId: req.user.clerkId })
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, clerkId: req.user.clerkId, items: [] })
        }

        // check if item already in the cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (!existingItem) {
            const newQuantity = existingItem.quantity + 1;
            if (product.stock < newQuantity) {
                return res.status(400).json({ error: "Insufficient stock" });
            }
            existingItem.quantity = newQuantity;
        } else {
            // add new item
            cart.items.push({ product: productId, quantity });
        }
        await cart.save()
        res.status(200).json({ message: "Item added to cart", cart });

    } catch (error) {
        console.error("Error in addToCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Clear Cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user._id })
        if (!cart) res.status(404).json({ message: "Cart not found", success: false })
        cart.items = []
        await cart.save()
        res.status(200).json({ message: "Cart cleared", cart });
    } catch (error) {
        console.error("Error in clearCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Cart
const getCart = async (req, res) => {
    try {
        const user = req.user
        let cart = await Cart.findOne({ user: user._id, clerkId: user.clerkId }).populate("items.product")
        if (!cart) {
            cart = await Cart.create({
                user: user._id,
                clerkId: user._id,
                items: []
            })
        }
        res.status(200).json({ cart })
    } catch (error) {
        console.error("Error in getCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }

};

// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const user = req.user
        const { productId } = req.params
        const cart = await Cart.findOne({ user: user._id, clerkId: user.clerkId })
        if (!cart) res.status(404).json({ message: "Cart not found", success: false })
        cart.items = cart.items.filter((element) => element.product !== productId)
        await cart.save()
        res.status(200).json({ messge: "Item removed from cart", cart })
    } catch (error) {
        console.error("Error in removeFromCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
    try {
        const user = req.user
        const { productId } = req.params
        const { quantity } = req.body
        if (quantity < 1) {
            return res.status(400).json({ error: "Quantity must be at least 1" });
        }

        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });


    } catch (error) {
        console.error("Error in updateCartItem controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addToCart,
    clearCart,
    getCart,
    removeFromCart,
    updateCartItem,
};
