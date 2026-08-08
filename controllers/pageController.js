const products = require("../data/produk");

exports.beranda = (req, res) => {
  res.render("index", {
    title: "Toko Sembako Ariesta — Papan Harga Digital",
    activePage: "beranda",
    unggulan: products.slice(0, 4),
    tickerItems: products
  });
};

exports.katalog = (req, res) => {
  const searchQuery = req.query.search || "";
  const selectedKategori = req.query.kategori || "";

  // Ambil daftar kategori dari data produk
  const kategoriList = [
    ...new Set(
      products.map((product) => product.category)
    )
  ];

  let produkList = products;

  // Filter berdasarkan pencarian
  if (searchQuery) {
    produkList = produkList.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  // Filter berdasarkan kategori
  if (selectedKategori) {
    produkList = produkList.filter(
      (product) =>
        product.category.toLowerCase() ===
        selectedKategori.toLowerCase()
    );
  }

  res.render("produk", {
    title: "Produk",
    produkList,
    searchQuery,
    selectedKategori,
    kategoriList,
    activePage: "produk"
  });
};


exports.detailProduk = (req, res) => {
  const id = Number(req.params.id);
  const produk = products.find((p) => p.id === id);

  if (!produk) {
    return res.status(404).render("produk-detail", {
      title: "Produk Tidak Ditemukan — Toko Sembako Ariesta",
      activePage: "produk",
      produk: null,
      notFound: true
    });
  }

  res.render("produk-detail", {
    title: `${produk.name} — Toko Sembako Ariesta`,
    activePage: "produk",
    produk,
    notFound: false
  });
};

exports.tanyaAI = (req, res) => {
  res.render("tanya-ai", {
    title: "Tanya AI — Toko Sembako Ariesta",
    activePage: "tanya-ai"
  });
};

exports.login = (req, res) => {
  if (req.user) return res.redirect("/admin");
  res.render("login", {
    title: "Login Admin — Toko Sembako Ariesta",
    activePage: "login",
    error: null
  });
};

exports.admin = (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard Admin — Toko Sembako Ariesta",
    activePage: "admin",
    user: req.user
  });
};
