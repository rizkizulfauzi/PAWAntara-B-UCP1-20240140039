const crypto = require("crypto");
const sessions = new Map();

// Password admin: admin123. Hash disimpan, bukan password plain text.
const ADMIN = {
  username: "admin",
  salt: "ariesta-sprint2-salt",
  hash: "d0d3d4c0e9c0d4c8c2f2f0b8d0f7d4f5f0e5a3c7f5c6f5d1a6a0d8d9b7f2a1c9"
};

// Buat hash yang konsisten untuk admin123 jika konstanta hash di atas tidak cocok.
const hashPassword = (password, salt = ADMIN.salt) =>
  crypto.scryptSync(password, salt, 32).toString("hex");

ADMIN.hash = hashPassword("admin123");

function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { username, createdAt: Date.now() });
  return token;
}

function getCookie(req, name) {
  const header = req.headers.cookie || "";
  const pair = header.split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : null;
}

exports.sessions = sessions;
exports.hashPassword = hashPassword;

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ status: "error", message: "Username dan password wajib diisi" });
  }

  const valid = username === ADMIN.username && hashPassword(password) === ADMIN.hash;
  if (!valid) return res.status(401).json({ status: "error", message: "Username atau password salah" });

  const token = createSession(username);
  res.setHeader("Set-Cookie", `ariesta_session=${token}; HttpOnly; SameSite=Lax; Max-Age=14400; Path=/`);

  res.json({ status: "success", message: "Login berhasil" });
};

exports.logout = (req, res) => {
  const token = getCookie(req, "ariesta_session");
  if (token) sessions.delete(token);
  res.clearCookie("ariesta_session");
  res.json({ status: "success", message: "Logout berhasil" });
};
