// middleware/catatAktivitas.js
// Middleware custom: mencatat setiap request yang masuk ke terminal
// (method, path, dan timestamp), dipasang global di server.js.

function catatAktivitas(req, res, next) {
  const waktu = new Date().toISOString();
  console.log(`[LOG] ${waktu} | ${req.method} ${req.path}`);
  next();
}

module.exports = catatAktivitas;
