// data/produk.js
// Data dummy barang dagangan Ariesta Mart.
// Nanti di Sprint 2, array ini "naik level" jadi sumber data yang bisa
// diubah lewat dashboard admin (REST API CRUD + login).

let daftarProduk = [
  {
    id: 1,
    nama: "Beras Rojolele 5kg",
    kategori: "beras",
    harga: 68000,
    stok: 24,
    satuan: "karung",
    deskripsi: "Beras lokal butiran pulen, favorit pelanggan tetap.",
  },
  {
    id: 2,
    nama: "Beras Basmati 1kg",
    kategori: "beras",
    harga: 32000,
    stok: 10,
    satuan: "pack",
    deskripsi: "Beras aromatik cocok untuk nasi goreng spesial.",
  },
  {
    id: 3,
    nama: "Minyak Goreng Sania 2L",
    kategori: "minyak",
    harga: 36000,
    stok: 18,
    satuan: "botol",
    deskripsi: "Minyak goreng kemasan botol, jernih dan awet.",
  },
  {
    id: 4,
    nama: "Gula Aren Cair 500ml",
    kategori: "gula",
    harga: 22000,
    stok: 14,
    satuan: "botol",
    deskripsi: "Gula aren cair alami, cocok untuk minuman & kue tradisional.",
  },
  {
    id: 5,
    nama: "Gula Pasir Lokal 1kg",
    kategori: "gula",
    harga: 15500,
    stok: 35,
    satuan: "pack",
    deskripsi: "Gula pasir putih bersih untuk kebutuhan dapur harian.",
  },
  {
    id: 6,
    nama: "Telur Ayam Kampung 1kg",
    kategori: "telur",
    harga: 33000,
    stok: 20,
    satuan: "kg",
    deskripsi: "Telur ayam kampung segar, langsung dari peternak mitra.",
  },
  {
    id: 7,
    nama: "Tepung Beras Rosebrand 500gr",
    kategori: "tepung",
    harga: 9500,
    stok: 27,
    satuan: "pack",
    deskripsi: "Tepung beras halus untuk kue basah tradisional.",
  },
  {
    id: 8,
    nama: "Teh Celup Tubruk (isi 25)",
    kategori: "minuman",
    harga: 11000,
    stok: 40,
    satuan: "box",
    deskripsi: "Teh celup wangi melati, praktis diseduh kapan saja.",
  },
];

module.exports = daftarProduk;
