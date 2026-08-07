// routes/api.js
const express = require("express");
const router = express.Router();
const products = require("../data/products");

router.get("/products", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Data produk berhasil diambil",
    data: products,
  });
});

module.exports = router;
