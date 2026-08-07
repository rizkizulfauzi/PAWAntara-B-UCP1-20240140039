// controllers/pageController.js
// Berisi logic untuk setiap halaman yang di-render server-side (EJS).

const daftarProduk = require("../data/produk");

// GET / -> Beranda
exports.beranda = (req, res) => {
  const unggulan = daftarProduk.slice(0, 4); // preview 4 produk pertama
  res.render("beranda", {
    judul: "Ariesta Mart - Belanja Sembako Online",
    halamanAktif: "beranda",
    unggulan,
  });
};

// GET /produk -> Katalog produk + filter query string
exports.katalog = (req, res) => {
  const { kategori, search } = req.query;
  let hasil = [...daftarProduk];

  if (kategori) {
    hasil = hasil.filter(
      (item) => item.kategori.toLowerCase() === String(kategori).toLowerCase()
    );
  }

  if (search) {
    const kataKunci = String(search).toLowerCase();
    hasil = hasil.filter((item) =>
      item.nama.toLowerCase().includes(kataKunci)
    );
  }

  const semuaKategori = [...new Set(daftarProduk.map((item) => item.kategori))];

  res.render("katalog", {
    judul: "Katalog Produk - Ariesta Mart",
    halamanAktif: "produk",
    daftarProduk: hasil,
    semuaKategori,
    filterKategori: kategori || "",
    filterSearch: search || "",
  });
};

// GET /produk/:id -> Detail produk (route dinamis)
exports.detailProduk = (req, res) => {
  const id = Number(req.params.id);
  const produk = daftarProduk.find((item) => item.id === id);

  if (!produk) {
    return res.status(404).render("detail-produk", {
      judul: "Produk Tidak Ditemukan - Ariesta Mart",
      halamanAktif: "produk",
      produk: null,
      ditemukan: false,
    });
  }

  res.render("detail-produk", {
    judul: `${produk.nama} - Ariesta Mart`,
    halamanAktif: "produk",
    produk,
    ditemukan: true,
  });
};

// GET /tanya-ai -> Halaman chat (logic balasan menyusul Sprint 2)
exports.tanyaAI = (req, res) => {
  res.render("tanya-ai", {
    judul: "Tanya AI - Ariesta Mart",
    halamanAktif: "tanya-ai",
  });
};
