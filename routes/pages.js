// routes/pages.js
const express = require("express");
const router = express.Router();
const products = require("../data/products");

router.get("/", (req, res) => {
  const unggulan = products.slice(0, 3);
  res.render("index", {
    title: "Toko Sembako Ariesta — Papan Harga Digital",
    activePage: "beranda",
    unggulan,
    tickerItems: products,
  });
});

router.get("/produk", (req, res) => {
  const { kategori, search } = req.query;
  let hasil = products;

  if (kategori) {
    hasil = hasil.filter((p) => p.category.toLowerCase() === kategori.toLowerCase());
  }
  if (search) {
    const keyword = search.toLowerCase();
    hasil = hasil.filter((p) => p.name.toLowerCase().includes(keyword));
  }

  const kategoriList = [...new Set(products.map((p) => p.category))];

  res.render("produk", {
    title: "Produk — Toko Sembako Ariesta",
    activePage: "produk",
    produkList: hasil,
    kategoriList,
    selectedKategori: kategori || "",
    searchQuery: search || "",
  });
});

router.get("/produk/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const produk = products.find((p) => p.id === id);

  if (!isNaN(id) && produk) {
    return res.render("produk-detail", {
      title: `${produk.name} — Toko Sembako Ariesta`,
      activePage: "produk",
      produk,
      notFound: false,
    });
  }

  res.status(404).render("produk-detail", {
    title: "Produk Tidak Ditemukan — Toko Sembako Ariesta",
    activePage: "produk",
    produk: null,
    notFound: true,
  });
});

router.get("/tanya-ai", (req, res) => {
  res.render("tanya-ai", {
    title: "Tanya AI — Toko Sembako Ariesta",
    activePage: "tanya-ai",
  });
});

module.exports = router;
