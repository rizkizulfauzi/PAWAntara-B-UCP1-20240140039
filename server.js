// server.js
// Entry point Ariesta Mart (Sprint 1)

const express = require("express");
const path = require("path");

const catatAktivitas = require("./middleware/catatAktivitas");
const webRoutes = require("./routes/webRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(catatAktivitas);

app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>404 - Halaman tidak ditemukan</h1>");
});

app.listen(PORT, () => {
  console.log(`Ariesta Mart siap diakses di http://localhost:${PORT}`);
});
