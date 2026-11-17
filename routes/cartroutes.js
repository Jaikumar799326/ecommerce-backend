const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Add To Cart
router.post("/", async (req, res) => {
  try {

    const cartItems = req.body;

    const results = [];

    for (const item of cartItems) {

      const existingCartItem = await Cart.findOne({
        user: item.user,
        product: item.product
      });

      if (existingCartItem) {

        existingCartItem.quantity += item.quantity;

        await existingCartItem.save();

        results.push(existingCartItem);

      } else {

        const newCartItem = await Cart.create(item);

        results.push(newCartItem);
      }
    }

    res.status(201).json({
      success: true,
      cartItems: results
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
// Get Cart Items

router.get("/", async (req, res) => {
  try {

    const cartItems = await Cart.find()
      .populate("user")
      .populate("product");
    res.status(200).json({
      success: true,
      cartItems
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;