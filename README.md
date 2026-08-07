# Toko Sembako Ariesta — Papan Harga Digital

**Nama:** _(isi nama kamu)_
**NIM:** _(isi NIM kamu)_
**Kelas:** _(isi kelas kamu)_

## Deskripsi Singkat

Versi "papan harga digital" dari website Toko Sembako Ariesta — dibangun
dengan Node.js, Express.js, dan EJS. Fokus Sprint 1 ini adalah fondasi
tampilan dan server:

- Struktur halaman semantik + partial navbar/footer
- Styling modern: tipografi Fraunces (display) + Public Sans (body) +
  IBM Plex Mono (angka harga), palet moss green & turmeric, kartu produk
  bergaya "tiket harga", dan strip harga berjalan (ticker) di beranda
- Server Express dengan routing dinamis, filter produk lewat query
  string, dan endpoint read-only `GET /api/products`

Sprint 2 (menyusul) akan menambahkan REST API CRUD penuh, login
admin/kasir, dashboard kelola produk, dan fitur Tanya AI dengan logika
dummy di backend.

## Cara Menjalankan Project Secara Lokal

```bash
npm install
npm run dev     # menjalankan server via nodemon (auto-restart)
# atau
npm start
```

Server berjalan di `http://localhost:3000`.

## Struktur Folder

```
ariesta-modern/
├── app.js
├── data/products.js
├── middleware/logger.js
├── routes/
│   ├── pages.js
│   └── api.js
├── views/
│   ├── partials/ (navbar, footer, head)
│   ├── index.ejs
│   ├── produk.ejs
│   ├── produk-detail.ejs
│   └── tanya-ai.ejs
├── public/
│   ├── css/style.css
│   └── js/main.js
└── package.json
```

## Daftar Halaman (Sprint 1)

| Route | Deskripsi |
|---|---|
| `GET /` | Beranda — hero + strip harga berjalan + produk unggulan |
| `GET /produk` | Papan harga produk, filter `?kategori=` dan `?search=` |
| `GET /produk/:id` | Detail 1 produk, pesan wajar jika ID tidak ditemukan |
| `GET /tanya-ai` | Chat UI + form (logika balasan menyusul Sprint 2) |

## Daftar Endpoint API (Sprint 1)

| Method | Endpoint | Deskripsi | Akses |
|---|---|---|---|
| GET | `/api/products` | Ambil seluruh data produk dalam format JSON | Publik |

```json
{
  "status": "success",
  "message": "Data produk berhasil diambil",
  "data": [
    { "id": 1, "name": "Beras Pandan Wangi 5kg", "category": "beras", "price": 65000, "stock": 20 }
  ]
}
```

## Penjelasan Tampilan (UI)

- **Konsep visual**: "papan harga digital" — setiap produk ditampilkan
  sebagai kartu bergaya tiket (garis putus-putus, lubang di kiri-kanan),
  dengan harga dalam font monospace ala mesin kasir.
- **Beranda**: hero dua kolom (headline + tiket produk favorit), diikuti
  strip harga berjalan (ticker, auto-scroll, berhenti otomatis jika
  `prefers-reduced-motion` aktif), produk unggulan, dan 3 kartu alasan
  belanja dengan ikon SVG.
- **Produk**: filter berupa search box + chip kategori (bukan dropdown),
  grid tiket produk 1/2/3 kolom sesuai lebar layar. Produk dengan stok
  < 10 ditandai "Stok terbatas" berwarna clay-red.
- **Detail Produk**: tiket harga besar di kolom kiri, info produk di
  kanan (sejajar di desktop, bertumpuk di mobile). ID tidak valid
  menampilkan halaman "Produk tidak ditemukan", bukan crash.
- **Tanya AI**: kotak riwayat chat + form input aksesibel.
- **Navbar**: sticky dengan efek blur transparan, menu mobile berupa
  panel yang muncul di bawah navbar (hamburger dengan ikon SVG yang
  berganti jadi ikon silang saat terbuka), lewat vanilla JS
  (`addEventListener` + toggle atribut `hidden`).

## Styling

Tailwind CDN sebagai basis utility, dikombinasikan dengan
`public/css/style.css` untuk design token (warna, tipografi), komponen
kartu tiket, animasi ticker, dan 2 breakpoint media query eksplisit
(`min-width: 640px` dan `min-width: 900px`).
