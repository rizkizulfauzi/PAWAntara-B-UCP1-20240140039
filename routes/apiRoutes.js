// routes/apiRoutes.js
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/products", apiController.ambilSemuaProduk);

module.exports = router;
