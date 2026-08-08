const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const authController = require("../controllers/authController");
const { requireLoginApi } = require("../middleware/auth");

router.post("/login", authController.login);
router.post("/logout", requireLoginApi, authController.logout);

router.get("/products", apiController.ambilSemuaProduk);
router.get("/products/:id", apiController.ambilProdukById);
router.post("/products", requireLoginApi, apiController.tambahProduk);
router.put("/products/:id", requireLoginApi, apiController.updateProduk);
router.delete("/products/:id", requireLoginApi, apiController.hapusProduk);

router.post("/chat", apiController.chat);

module.exports = router;
