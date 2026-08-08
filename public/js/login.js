document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const error = document.getElementById("login-error");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); error.textContent = "";
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    if (!username || !password) { error.textContent = "Username dan password wajib diisi."; return; }
    try {
      const response = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      window.location.href = "/admin";
    } catch (e) { error.textContent = e.message; }
  });
});
