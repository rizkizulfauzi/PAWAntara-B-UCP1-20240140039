// data/products.js
// Data dummy Toko Sembako Ariesta. Field "updatedLabel" dipakai untuk
// kesan "papan harga hari ini" di UI (bukan timestamp asli, cukup label statis).

const products = [
  { id: 1, name: "Beras Pandan Wangi 5kg", category: "beras", price: 65000, stock: 20, unit: "karung" },
  { id: 2, name: "Beras Merah Organik 1kg", category: "beras", price: 22000, stock: 8, unit: "pack" },
  { id: 3, name: "Minyak Goreng Kemasan 2L", category: "minyak", price: 34000, stock: 15, unit: "botol" },
  { id: 4, name: "Gula Pasir 1kg", category: "gula", price: 16000, stock: 30, unit: "pack" },
  { id: 5, name: "Gula Aren Cetak 500gr", category: "gula", price: 18500, stock: 6, unit: "pack" },
  { id: 6, name: "Telur Ayam Negeri 1kg", category: "telur", price: 28000, stock: 25, unit: "kg" },
  { id: 7, name: "Tepung Terigu Segitiga 1kg", category: "tepung", price: 13000, stock: 18, unit: "pack" },
  { id: 8, name: "Kopi Bubuk Sachet (isi 10)", category: "minuman", price: 12000, stock: 40, unit: "box" },
];

module.exports = products;
