// controllers/apiController.js
// Logic untuk endpoint REST API (Sprint 1: read-only).

const daftarProduk = require("../data/produk");

// GET /api/products
exports.ambilSemuaProduk = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Daftar produk berhasil diambil",
    data: daftarProduk,
  });
};
