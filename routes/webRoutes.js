const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const { requireLoginPage } = require("../middleware/auth");

router.get("/", pageController.beranda);
router.get("/produk", pageController.katalog);
router.get("/produk/:id", pageController.detailProduk);
router.get("/tanya-ai", pageController.tanyaAI);
router.get("/login", pageController.login);
router.get("/admin", requireLoginPage, pageController.admin);

module.exports = router;
