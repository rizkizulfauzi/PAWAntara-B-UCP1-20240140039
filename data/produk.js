// Sumber data produk bersama untuk Sprint 1 & Sprint 2.
// Data bersifat in-memory: perubahan berlaku selama server berjalan.
let products = [
  { id: 1, name: "Beras Pandan Wangi 5kg", category: "beras", price: 65000, stock: 20, unit: "karung", description: "Beras pulen untuk kebutuhan keluarga sehari-hari." },
  { id: 2, name: "Beras Merah Organik 1kg", category: "beras", price: 22000, stock: 8, unit: "pack", description: "Beras merah pilihan dengan tekstur dan aroma khas." },
  { id: 3, name: "Minyak Goreng Kemasan 2L", category: "minyak", price: 34000, stock: 15, unit: "botol", description: "Minyak goreng kemasan praktis untuk kebutuhan dapur." },
  { id: 4, name: "Gula Pasir 1kg", category: "gula", price: 16000, stock: 30, unit: "pack", description: "Gula pasir putih untuk minuman dan masakan." },
  { id: 5, name: "Gula Aren Cetak 500gr", category: "gula", price: 18500, stock: 6, unit: "pack", description: "Gula aren dengan rasa manis khas untuk minuman dan kue." },
  { id: 6, name: "Telur Ayam Negeri 1kg", category: "telur", price: 28000, stock: 25, unit: "kg", description: "Telur ayam segar untuk kebutuhan rumah tangga." },
  { id: 7, name: "Tepung Terigu Segitiga 1kg", category: "tepung", price: 13000, stock: 18, unit: "pack", description: "Tepung terigu serbaguna untuk aneka masakan dan kue." },
  { id: 8, name: "Kopi Bubuk Sachet (isi 10)", category: "minuman", price: 12000, stock: 40, unit: "box", description: "Kopi praktis untuk teman santai kapan saja." }
];

module.exports = products;
