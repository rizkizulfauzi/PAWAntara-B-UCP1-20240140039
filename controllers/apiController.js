const products = require("../data/produk");

function response(status, message, data) {
  const body = { status, message };
  if (data !== undefined) body.data = data;
  return body;
}

exports.ambilSemuaProduk = (req, res) => {
  const kategori = String(req.query.kategori || "").trim().toLowerCase();
  const search = String(req.query.search || "").trim().toLowerCase();
  let hasil = [...products];

  if (kategori) hasil = hasil.filter((p) => p.category.toLowerCase() === kategori);
  if (search) hasil = hasil.filter((p) => p.name.toLowerCase().includes(search));

  res.json(response("success", "Data produk berhasil diambil", hasil));
};

exports.ambilProdukById = (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json(response("error", "Produk tidak ditemukan"));
  res.json(response("success", "Data produk berhasil diambil", product));
};

exports.tambahProduk = (req, res) => {
  const { name, category, price, stock, unit, description } = req.body;
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json(response("error", "Nama, kategori, harga, dan stok wajib diisi"));
  }

  const numericPrice = Number(price);
  const numericStock = Number(stock);
  if (!Number.isFinite(numericPrice) || numericPrice < 0 || !Number.isInteger(numericStock) || numericStock < 0) {
    return res.status(400).json(response("error", "Harga atau stok tidak valid"));
  }

  const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const product = {
    id: newId,
    name: String(name).trim(),
    category: String(category).trim().toLowerCase(),
    price: numericPrice,
    stock: numericStock,
    unit: String(unit || "pcs").trim(),
    description: String(description || "").trim()
  };

  products.push(product);
  res.status(201).json(response("success", "Produk ditambahkan", product));
};

exports.updateProduk = (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json(response("error", "Produk tidak ditemukan"));

  const { name, category, price, stock, unit, description } = req.body;
  if (name !== undefined) product.name = String(name).trim();
  if (category !== undefined) product.category = String(category).trim().toLowerCase();
  if (price !== undefined) {
    const value = Number(price);
    if (!Number.isFinite(value) || value < 0) return res.status(400).json(response("error", "Harga tidak valid"));
    product.price = value;
  }
  if (stock !== undefined) {
    const value = Number(stock);
    if (!Number.isInteger(value) || value < 0) return res.status(400).json(response("error", "Stok tidak valid"));
    product.stock = value;
  }
  if (unit !== undefined) product.unit = String(unit).trim();
  if (description !== undefined) product.description = String(description).trim();

  res.json(response("success", "Produk diperbarui", product));
};

exports.hapusProduk = (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json(response("error", "Produk tidak ditemukan"));
  products.splice(index, 1);
  res.json(response("success", "Produk dihapus"));
};

exports.chat = (req, res) => {
  const question = String(req.body.question || req.body.message || "").trim().toLowerCase();
  if (!question) return res.status(400).json(response("error", "Pertanyaan wajib diisi"));

  let reply = "Maaf, aku belum memahami pertanyaan itu. Coba tanya tentang harga, stok, jam buka, ongkir, atau pembayaran.";
  const match = products.find((p) => question.includes(p.name.toLowerCase().split(" ")[0]));

  if (question.includes("jam") || question.includes("buka") || question.includes("tutup")) {
    reply = "Toko Ariesta buka setiap hari pukul 07.00–20.00 WIB.";
  } else if (question.includes("antar") || question.includes("ongkir") || question.includes("kirim")) {
    reply = "Bisa antar untuk area sekitar toko. Ongkir menyesuaikan jarak dan akan dikonfirmasi sebelum pesanan dikirim.";
  } else if (question.includes("bayar") || question.includes("pembayaran") || question.includes("transfer")) {
    reply = "Pembayaran dapat dikonfirmasi melalui tunai atau transfer. Detail pembayaran diberikan saat pemesanan.";
  } else if (match) {
    reply = `${match.name} saat ini Rp${match.price.toLocaleString("id-ID")} dan stok tersedia ${match.stock} ${match.unit}.`;
  } else if (question.includes("stok") || question.includes("ada")) {
    const tersedia = products.filter((p) => p.stock > 0).length;
    reply = `Saat ini ada ${tersedia} produk yang masih tersedia. Sebutkan nama produk kalau ingin cek stok tertentu.`;
  }

  res.json(response("success", "Balasan berhasil dibuat", { reply }));
};
