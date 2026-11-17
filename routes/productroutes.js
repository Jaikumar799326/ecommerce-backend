const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

//post the product
//router.post("/", async (req, res) => {
  //try {
    //const product = await Product.create(req.body);

    //res.status(201).json({
     // success: true,
      //product,
    //});
 // } catch (error) {
   // res.status(500).json({
     // message: error.message,
   // });
 // }
//});

//POST THE PRODUCT
router.post("/", async (req, res) => {
  try {

    let result;

    if (Array.isArray(req.body)) {

      result = await Product.insertMany(req.body);

    } else {

      result = await Product.create(req.body);

    }

    res.status(201).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

//get the product
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//get the single product using the id 
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Product

router.put("/:id", async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// Delete Product

router.delete("/:id", async (req, res) => {
  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Product Deleted",
      product
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
module.exports = router;