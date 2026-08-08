const { sessions } = require("../controllers/authController");

function getUser(req) {
  const header = req.headers.cookie || "";
  const pair = header.split(";").map(v => v.trim()).find(v => v.startsWith("ariesta_session="));
  const token = pair ? decodeURIComponent(pair.slice("ariesta_session=".length)) : null;
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  return { username: session.username };
}

function attachUser(req, res, next) {
  req.user = getUser(req);
  res.locals.user = req.user;
  next();
}

function requireLoginPage(req, res, next) {
  if (!req.user) return res.redirect("/login");
  next();
}

function requireLoginApi(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ status: "error", message: "Unauthorized, silakan login terlebih dahulu" });
  }
  next();
}

module.exports = { attachUser, requireLoginPage, requireLoginApi };
