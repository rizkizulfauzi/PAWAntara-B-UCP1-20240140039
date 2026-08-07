// routes/webRoutes.js
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/", pageController.beranda);
router.get("/produk", pageController.katalog);
router.get("/produk/:id", pageController.detailProduk);
router.get("/tanya-ai", pageController.tanyaAI);

module.exports = router;
