const express = require("express");
const path = require("path");

const requestLogger = require("./middleware/logger");
const { attachUser } = require("./middleware/auth");

const pageRoutes = require("./routes/webRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ===============================
// VIEW ENGINE
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ===============================
// STATIC FILES
// ===============================

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);


// ===============================
// BODY PARSER
// ===============================

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());


// ===============================
// CUSTOM MIDDLEWARE
// ===============================

// Logger
app.use(requestLogger);

// Menyediakan informasi user
// ke request / response
app.use(attachUser);


// ===============================
// ROUTES
// ===============================

// Halaman website
app.use("/", pageRoutes);

// REST API
app.use("/api", apiRoutes);


// ===============================
// 404
// ===============================

app.use((req, res) => {

  res.status(404).render("404", {
    title: "404 — Halaman Tidak Ditemukan",
    activePage: ""
  });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

  console.log(
    `Toko Sembako Ariesta berjalan di http://localhost:${PORT}`
  );

});