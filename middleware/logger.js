// middleware/logger.js
function requestLogger(req, res, next) {
  const waktu = new Date().toLocaleTimeString("id-ID");
  console.log(`[${waktu}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = requestLogger;
